import React, { Component } from 'react'
import questionService from './services/questions'
import categoryService from './services/categories'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Container, Button, Table, Form, Dropdown } from 'semantic-ui-react'

const Latex = (props) => {
  const array = props.code.split('\block')
  return (
    <div className='inline'>
      {array.map((s, i) => {
        if (s.length === 0) {
          return null
        }
        if (s.includes("katex-block")) {
          const block = s.substring(11)
          return <BlockMath key={i} math={block} />
        } else {
          return <InlineMath key={i} math={s} />
        }
      })}
    </div>
  )
}

class QuickReview extends Component {
  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    const questions = await questionService.getAll()
    const categories = await categoryService.getAll()
    this.props.store.dispatch({
      type: 'INIT_DATA',
      data: { questions, categories }
    })
  }

  handleChange = (event, { name, value }) => {
    if (event.target.name && event.target.value) {
      this.setState({ [event.target.name]: event.target.value })
    } else {
      this.setState({ [name]: value })
    }
  }

  addCategory = async (event) => {
    event.preventDefault()
    const category = {
      name: event.target.newCategoryName.value
    }
    const newCategory = await categoryService.create(category)
    this.props.store.dispatch({
      type: 'NEW_CATEGORY',
      data: newCategory
    })
  }

  addQuestion = async (event, { name, value }) => {
    event.preventDefault()
    console.log(name)
    const question = {
      question: event.target.question.value,
      answers: [
        {
          id: 'a',
          answer: event.target.newA.value
        },
        {
          id: 'b',
          answer: event.target.newB.value
        },
        {
          id: 'c',
          answer: event.target.newC.value
        }
      ],
      correctAnswer: event.target.correctAnswer.value,
      explanation: event.target.explanation.value,
      category: event.target.category.value
    }
    const newQuestion = await questionService.create(question)
    await this.props.store.dispatch({
      type: 'NEW_QUESTION',
      data: newQuestion
    })
  }

  checkAnswer = (answerId) => {
    return () => {
      this.props.store.dispatch({
        type: 'ANSWER',
        data: {
          chosenAnswer: answerId
        }
      })
    }
  }

  generateNewRandomIndex() {
    let question = this.props.store.getState().currentQuestion
    let randomIndex = 0
    const numberOfQuestions = this.props.store.getState().questions.length
    if(numberOfQuestions === 1) {
      return randomIndex
    }
    while (this.props.store.getState().currentQuestion === question) {
      randomIndex = Math.floor(Math.random() * numberOfQuestions)
      question = this.props.store.getState().questions[randomIndex]
    }
    return randomIndex
  }

  randomQuestion = () => {
    const randomIndex = this.generateNewRandomIndex()
    this.props.store.dispatch({
      type: 'RANDOM_QUESTION',
      data: randomIndex
    })
  }

  render() {
    const startCategory = [{ id: 0, text: 'Inget val', value: '' }]
    let categoryOptions
    if (this.props.store.getState().categories.length === 0) {
      categoryOptions = []
    } else {
      categoryOptions = this.props.store.getState().categories.reduce((options, c) => {
        return options.concat({
          id: c.id, text: c.name, value: c.id
        })
      }, startCategory)
    }
    console.log(this.props.store.getState())
    if (!this.props.store.getState().currentQuestion) {
      return (
        <Container>
          <div>
            <h1> QuickReview </h1>
            <Button onClick={this.randomQuestion}>New question</Button>
            <h2>Add category</h2>
            <Form onSubmit={this.addCategory}>
              <Form.Input label='Name' name='newCategoryName' />
              <Button type='submit'>Submit category</Button>
            </Form>
            <h2>Add question</h2>
            <Form onSubmit={this.addQuestion}>
              <Form.Field>
                <label>Category</label>
                <Dropdown
                  placeholder='Choose a category'
                  defaultValue={null}
                  name='category'
                  fluid selection
                  options={categoryOptions}
                />
              </Form.Field>
              <Form.Input label='Question' name='question' />
              <Form.Input label='Answer a)' name='newA' />
              <Form.Input label='Answer b)' name='newB' />
              <Form.Input label='Answer c)' name='newC' />
              <Form.Input label='Correct answer' name='correctAnswer' />
              <Form.Input label='Explanation' name='explanation' />
              <Button type='submit'>Submit question</Button>
            </Form>
          </div>
        </Container>
      )
    }
    if (this.props.store.getState().answered) {
      return (
        <Container>
          <div className="QuickReview">
            <h1>QuickReview</h1>
            <Latex code={this.props.store.getState().currentQuestion.question} />
            <Table collapsing unstackable>
              <Table.Body>
                {this.props.store.getState().currentQuestion.answers.map(a =>
                  <Table.Row key={a.id} positive={a.id === this.props.store.getState().currentQuestion.correctAnswer} negative={a.id !== this.props.store.getState().currentQuestion.correctAnswer}>
                    <Table.Cell>
                      <Latex code={`${a.id})\\quad ${a.answer}`} />
                    </Table.Cell>
                  </Table.Row>)}
              </Table.Body>
            </Table>
            <Latex code={`\\text{Correct answer: } ${this.props.store.getState().currentQuestion.correctAnswer})`} /> &nbsp;
            <Latex code={`\\text{Your answer: } ${this.props.store.getState().chosenAnswer})`} /> &nbsp;
            <Latex code={`\\text{Explanation: } ${this.props.store.getState().currentQuestion.explanation}`} /> &nbsp;
            <Button onClick={this.randomQuestion}>New question</Button>
          </div>
        </Container>
      )
    } else {
      return (
        <Container>
          <div className="QuickReview">
            <h1>QuickReview</h1>
            <Latex code={this.props.store.getState().currentQuestion.question} />
            <Table collapsing unstackable>
              <Table.Body>
                {this.props.store.getState().currentQuestion.answers.map(a =>
                  <Table.Row key={a.id}>
                    <Table.Cell>
                      <Latex code={`${a.id})\\quad ${a.answer}`} />
                    </Table.Cell>
                    <Table.Cell>
                      <Button compact onClick={this.checkAnswer(a.id)}>Answer</Button>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
            <Button onClick={this.randomQuestion}>New question</Button>
            <h2>Add category</h2>
            <Form onSubmit={this.addCategory}>
              <Form.Input label='Name' name='newCategoryName' />
              <Button type='submit'>Submit category</Button>
            </Form>
            <h2>Add question</h2>
            <Form onSubmit={this.addQuestion}>
              <Form.Field>
                <label>Category</label>
                <Dropdown
                  placeholder='Choose a category'
                  defaultValue={null}
                  name='category'
                  fluid selection
                  options={categoryOptions}
                />
              </Form.Field>
              <Form.Input label='Question' name='question' />
              <Form.Input label='Answer a)' name='newA' />
              <Form.Input label='Answer b)' name='newB' />
              <Form.Input label='Answer c)' name='newC' />
              <Form.Input label='Correct answer' name='correctAnswer' />
              <Form.Input label='Explanation' name='explanation' />
              <Button type='submit'>Submit question</Button>
            </Form>
          </div>
        </Container>
      )
    }
  }
}

export default QuickReview
