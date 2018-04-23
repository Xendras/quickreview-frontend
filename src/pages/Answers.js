import React from 'react'
import { Form, Button, Input, Modal } from 'semantic-ui-react'
import AnswersList from '../components/AnswersList'

class Answers extends React.Component {

  render() {
    if (!props.user) {
      return null
    }
    return (
      <div>
        <h1> Answers </h1>
        <AnswersList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Answers)