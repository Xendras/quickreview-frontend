import React from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {

  render() {
    return (
      <div>
        <h1> QuickReview </h1>
        <LoginForm />
      </div>
    )
  }
}

export default withRouter(connect()(Login))