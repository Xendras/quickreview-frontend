import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import loginService from '../services/login'
import categoriesService from '../services/categories'
import usersService from '../services/users'
import questionsService from '../services/questions'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'

class LoginForm extends React.Component {

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value.trim(),
        password: event.target.password.value
      })

      window.localStorage.setItem('loggedReviewUser', JSON.stringify(user))
      categoriesService.setToken(user.token)
      questionsService.setToken(user.token)
      usersService.setToken(user.token)
      this.props.login(user)
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <Form onSubmit={this.login}>
          <Form.Field>
            <label>Username</label>
            <Input name="username" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input type="password" name="password" />
          </Form.Field>
          <Button type="submit">Logga in</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(LoginForm)