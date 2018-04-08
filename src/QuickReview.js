import React, { Component } from 'react'
import questionService from './services/questions'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Container, List, Button, Grid, Table, Form, Input } from 'semantic-ui-react'

const Latex = (props) => {
  const array = props.code.split('\block')
  return (
    <div className='inline'>
      {array.map(s => {
        if (s.length === 0) {
          return null
        }
        if (s.includes("katex-block")) {
          const block = s.substring(11)
          return <BlockMath math={block} />
        } else {
          return <InlineMath math={s} />
        }
      })}
    </div>
  )
}

class QuickReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      currentQuestion: null,
      chosenAnswer: '',
      answered: false,
      newQuestion: '',
      newA: '',
      newB: '',
      newC: '',
      newCorrect: '',
      newExplanation: ''
    }
  }

  async componentWillMount() {
    const questions = await questionService.getAll()
    this.setState({ questions, currentQuestion: questions[0] })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addQuestion = async (event) => {
    event.preventDefault()
    const question = {
      id: this.state.questions.length + 1,
      question: this.state.newQuestion,
      answers: [
        {
          id: 'a',
          answer: this.state.newA
        },
        {
          id: 'b',
          answer: this.state.newB
        },
        {
          id: 'c',
          answer: this.state.newC
        }
      ],
      correctAnswer: this.state.newCorrect,
      explanation: this.state.newExplanation
    }
    await questionService.create(question)
    const questions = this.state.questions.concat(question)
    this.setState({
      questions,
      newQuestion: '',
      newA: '',
      newB: '',
      newC: '',
      newCorrect: '',
      newExplanation: ''
    })
  }

  checkAnswer = (answerId) => {
    return () => {
      this.setState({ answered: true, chosenAnswer: answerId })
    }
  }

  randomQuestion = () => {
    const numberOfQuestions = this.state.questions.length
    const randomIndex = Math.floor(Math.random() * numberOfQuestions)
    const question = this.state.questions[randomIndex]
    this.setState({ currentQuestion: question, answered: false, chosenAnswer: '' })
  }

  render() {
    if (!this.state.currentQuestion) {
      return null
    }
    if (this.state.answered) {
      return (
        <Container>
          <div className="QuickReview">
            <h1>QuickReview</h1>
            <Latex code={this.state.currentQuestion.question} />
            <Table collapsing unstackable>
              {this.state.currentQuestion.answers.map(a =>
                <Table.Row positive={a.id === this.state.currentQuestion.correctAnswer} negative={a.id !== this.state.currentQuestion.correctAnswer}>
                  <Table.Cell>
                    <Latex code={`${a.id})\\quad ${a.answer}`} />
                  </Table.Cell>
                </Table.Row>)}
            </Table>
            <Latex code={`\\text{Correct answer: } ${this.state.currentQuestion.correctAnswer})`} /> &nbsp;
            <Latex code={`\\text{Your answer: } ${this.state.chosenAnswer})`} /> &nbsp;
            <Latex code={`\\text{Explanation: } ${this.state.currentQuestion.explanation}`} /> &nbsp;
            <Button onClick={this.randomQuestion}>New question</Button>
          </div>
        </Container>
      )
    } else {
      return (
        <Container>
          <div className="QuickReview">
            <h1>QuickReview</h1>
            <Latex code={this.state.currentQuestion.question} />
            <Table collapsing unstackable>
              {this.state.currentQuestion.answers.map(a =>
                <Table.Row>
                  <Table.Cell>
                    <Latex code={`${a.id})\\quad ${a.answer}`} />
                  </Table.Cell>
                  <Table.Cell>
                    <Button compact onClick={this.checkAnswer(a.id)}>Answer</Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table>
            <Button onClick={this.randomQuestion}>New question</Button>
            <h2>Add question</h2>
            <Form onSubmit={this.addQuestion}>
              <Form.Input label='Question' name='newQuestion' value={this.state.newQuestion} onChange={this.handleChange} />
              <Form.Input label='Answer a)' name='newA' value={this.state.newA} onChange={this.handleChange} />
              <Form.Input label='Answer b)' name='newB' value={this.state.newB} onChange={this.handleChange} />
              <Form.Input label='Answer c)' name='newC' value={this.state.newC} onChange={this.handleChange} />
              <Form.Input label='Correct answer' name='newCorrect' value={this.state.newCorrect} onChange={this.handleChange} />
              <Form.Input label='Explanation' name='newExplanation' value={this.state.newExplanation} onChange={this.handleChange} />
              <Button type='submit'>Submit question</Button>
            </Form>
          </div>
        </Container>
      )
    }
  }
}

export default QuickReview
