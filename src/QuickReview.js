import React, { Component } from 'react'
import questionService from './services/questions'
import categoryService from './services/categories'
import userService from './services/users'
import answerService from './services/answers'
import 'katex/dist/katex.min.css'
import { Container, Menu, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom'
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
      this.props.initData({ questions, categories, users, answers })

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
        <ErrorModal />
        <Router>
          <div>
            <Link to='/' name='Quickreview'> QuickReview </Link> &nbsp;
            {this.props.user ? <Link to="/answers" name='Answers'>Answers</Link> : null} &nbsp;
            {this.props.user ? <Link to='/logout' name='Logout' onClick={this.logout}>Logout</Link> : null}
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path='/answers' component={Answers} />
              <Route exact path='/login' component={Login} />
            </Switch>
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
