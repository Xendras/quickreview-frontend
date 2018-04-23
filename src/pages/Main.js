import React from 'react'
import { Form, Button, Input, Modal } from 'semantic-ui-react'
import Question from '../components/Question'
import CategoryForm from '../components/CategoryForm'
import QuestionForm from '../components/QuestionForm'
import CategoryFilter from '../components/CategoryFilter'

class Main extends React.Component {

  render() {
    return (
      <div>
        <h1> QuickReview </h1>
        <CategoryFilter />
        <Question />
        <CategoryForm />
        <QuestionForm />
      </div>
    )
  }
}

export default Main