import React, { Component } from 'react'
import categoryService from '../services/categories'
import { Form, Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { error } from '../reducers/errorReducer'
import { newCategory } from '../reducers/categoryReducer'

class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  addCategory = async (event) => {
    event.preventDefault()
    try {

      if (event.target.newCategoryName.value.length <= 3) {
        return this.props.error('Category name missing or too short')
      }
      const category = {
        name: event.target.newCategoryName.value
      }
      const newCategory = await categoryService.create(category)
      this.props.newCategory(newCategory)
    } catch (exception) {
      console.log(exception)
      this.props.error('Something has gone wrong')
    }
  }

  closeAndSubmit = async (event) => {
    await this.addCategory(event)
    if (!this.props.errorModal) {
      this.setState({ modal: false })
    }
  }

  render() {
    if (!this.props.user) {
      return null
    }
    return (
      <div>
        <Modal basic open={this.state.modal} trigger={<Button onClick={() => this.setState({ modal: true })}>Add category</Button>} >
          <Modal.Content>
            <h2>Add category</h2>
            <Form unstackable inverted onSubmit={this.closeAndSubmit}>
              <Form.Input label='Name' name='newCategoryName' />
              <Button type='submit'>Submit category</Button>
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
    errorModal: state.errors.errorModal,
    user: state.users.user
  }
}

const mapDispatchToProps = {
  error,
  newCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)