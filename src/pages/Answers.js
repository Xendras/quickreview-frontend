import React from 'react'
import { Form, Button, Input, Modal } from 'semantic-ui-react'
import AnswersList from '../components/AnswersList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Answers extends React.Component {

  render() {
    if (!this.props.user) {
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
    user: state.users.user
  }
}

export default withRouter(connect(mapStateToProps)(Answers))