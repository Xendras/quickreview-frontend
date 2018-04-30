import React, { Component } from 'react'
import questionService from '../services/questions'
import categoryService from '../services/categories'
import { Form, Dropdown, Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { newQuestion } from '../reducers/questionReducer'
import { error } from '../reducers/errorReducer'

class QuestionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      category: null
    }
  }

  initialiseCategories() {
    const categories = this.props.categories
    const startCategory = [{ key: 0, id: 0, text: 'Inget val', value: 'Inget val' }]
    const categoryOptions = categories.reduce((options, c) => {
      return options.concat({
        key: c.id, id: c.id, text: c.name, value: c.id
      })
    }, startCategory)
    return categoryOptions
  }

  addQuestion = async (event) => {
    event.preventDefault()
    try {
      if (event.target.question.value.length === 0 ||
        event.target.newA.value.length === 0 ||
        event.target.newB.value.length === 0 ||
        event.target.newC.value.length === 0 ||
        event.target.correctAnswer.value.length === 0 ||
        event.target.explanation.value.length === 0 ||
        !this.state.category) {
        return this.props.error('Information missing')
      }
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
        category: this.state.category.id
      }
      const newQuestion = await questionService.create(question)
      console.log(newQuestion)
      this.props.newQuestion(newQuestion)
    } catch (exception) {
      console.log(exception)
      this.props.store.error('Something has gone wrong')
    }
  }

  closeAndSubmit = async (event) => {
    await this.addQuestion(event)
    if (!this.props.errorModal) {
      this.setState({ modal: false })
    }
  }

  updateCategory = async (event, { value, name }) => {
    this.setState({ category: this.props.categories.find(c => value === c.id) })
  }

  render() {
    const categories = this.initialiseCategories()
    if (!Array.isArray(categories)) {
      return null
    }
    if (!this.props.user) {
      return null
    }
    return (
      <div>
        <Modal basic open={this.state.modal} trigger={<Button onClick={() => this.setState({ modal: true })} > Add question </Button>}>
          <Modal.Content>
            <h2>Add question</h2>
            <Form unstackable inverted onSubmit={this.closeAndSubmit}>
              <Form.Field>
                <label>Category</label>
                <Dropdown
                  placeholder='Choose a category'
                  defaultValue=''
                  name='category'
                  fluid selection
                  options={categories}
                  onChange={this.updateCategory}
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
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.setState({ modal: false })}> Cancel </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    user: state.users.user,
    errorModal: state.errors.errorModal
  }
}

const mapDispatchToProps = {
  newQuestion,
  error
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)