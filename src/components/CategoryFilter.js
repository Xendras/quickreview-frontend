import React, { Component } from 'react'
import questionService from '../services/questions'
import categoryService from '../services/categories'
import { Form, Dropdown, Button, Modal } from 'semantic-ui-react'

class CategoryFilter extends Component {

  initialiseCategories() {
    const categories = this.props.store.getState().categories
    const startCategory = [{ key: 0, id: 0, text: 'Inget val', value: 'Inget val' }]
    const categoryOptions = categories.reduce((options, c) => {
      return options.concat({
        key: c.id, id: c.id, text: c.name, value: c.id
      })
    }, startCategory)
    return categoryOptions
  }

  updateCategory = async (event, { value, name }) => {
    const state = this.props.store.getState()
    if (value === 'Inget val') {
      return this.props.store.dispatch({
        type: 'CATEGORY_FILTER',
        data: { id: 0 }
      })
    }
    const category = state.categories.find(c => value === c.id)
    if (!category) {
      return
    }
    this.props.store.dispatch({
      type: 'CATEGORY_FILTER',
      data: category
    })
  }

  render() {
    const categories = this.initialiseCategories()
    if (!Array.isArray(categories)) {
      return null
    }
    return (
      <div>
        <h2>Choose category </h2>
        <Dropdown
          placeholder='Choose a category'
          defaultValue=''
          name='category'
          fluid selection
          options={categories}
          onChange={this.updateCategory}
        />
      </div>
    )
  }
}

export default CategoryFilter