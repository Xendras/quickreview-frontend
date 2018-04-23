import React, { Component } from 'react'
import questionService from './services/questions'
import categoryService from './services/categories'
import userService from './services/users'
import answerService from './services/answers'
import 'katex/dist/katex.min.css'
import { Container, Menu } from 'semantic-ui-react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Answers from './pages/Answers'
import ErrorModal from './components/ErrorModal'
import { connect } from 'react-redux'
import { login, logout, initData } from './reducers/userReducer'


class QuickReview extends Component {

  async componentWillMount() {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedReviewUser')
      const questions = await questionService.getAll()
      const categories = await categoryService.getAll()
      const users = await userService.getAll()
      const answers = await answerService.getAll()

      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        questionService.setToken(user.token)
        userService.setToken(user.token)
        categoryService.setToken(user.token)
        this.props.login(user)
      }
      this.props.initData({ questions, categories, users, answers})

    } catch (exception) {
      console.log(exception)
    }
  }

  logout = async (event) => {
    if (event) {
      event.preventDefault()
    }
    window.localStorage.removeItem('loggedReviewUser')
    this.props.logout()
  }

  render() {
    return (
      <Container>
        <Router >
          <div>
            <ErrorModal />
            <Menu.Item as={Link} to='/' name='Quickreview' /> &nbsp;
            {this.props.user ? <Menu.Item as={Link} to="/answers" name='Answers' /> : null} &nbsp;
            {this.props.user ? <Menu.Item as={Link} to='/logout' name='Logout' onClick={this.logout} /> : null}
            <Route exact path="/" render={() =>
              <Main />
            }
            />
            <Route exact path="/answers" render={() =>
              <Answers />
            }
            />
            <Route exact path='/login' render={() =>
              <Login />
            }
            />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

const mapDispatchToProps = {
  login,
  logout,
  initData
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickReview)
