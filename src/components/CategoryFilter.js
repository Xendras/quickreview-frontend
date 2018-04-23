import React, { Component } from 'react'
import questionService from '../services/questions'
import categoryService from '../services/categories'
import { Form, Dropdown, Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectCategory } from '../reducers/categoryReducer'

class CategoryFilter extends Component {

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

  updateCategory = async (event, { value, name }) => {
    if (value === 'Inget val') {
      return this.props.selectCategory({ id: 0 })
    }
    const category = this.props.categories.find(c => value === c.id)
    if (!category) {
      return
    }
    this.props.selectCategory(category)
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

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories
  }
}

const mapDispatchToProps = {
  selectCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)