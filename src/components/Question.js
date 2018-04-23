import React, { Component } from 'react'
import Latex from './Latex'
import questionService from '../services/questions'
import answerService from '../services/answers'
import { Button, Table, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { answer } from '../reducers/answerReducer'
import { randomQuestion, deleteCurrentQuestion } from '../reducers/questionReducer'

class Question extends Component {

  checkAnswer = (answerId) => {
    return async () => {
      const answerObject = {
        question: this.props.currentQuestion.id,
        answer: answerId
      }
      const answer = await answerService.create(answerObject)
      this.props.store.dispatch({
        type: 'ANSWER',
        data: answer
      })
    }
  }

  generateNewRandomIndex() {
    let question = this.props.currentQuestion
    let randomIndex = 0
    const numberOfQuestions = this.props.questions.length
    if (numberOfQuestions <= 1) {
      return randomIndex
    }
    while (this.props.currentQuestion === question) {
      randomIndex = Math.floor(Math.random() * numberOfQuestions)
      question = this.props.questions[randomIndex]
    }
    return randomIndex
  }

  randomQuestion = () => {
    const randomIndex = this.generateNewRandomIndex()
    this.props.randomQuestion(randomIndex, this.props.currentCategory )
  }

  deleteQuestion = async () => {
    await questionService.remove(this.props.currentQuestion.id)
    this.props.deleteCurrentQuestion()
  }

  render() {

    if (!this.props.currentQuestion) {
      return (
        <Button onClick={this.randomQuestion}>New question</Button>
      )
    }

    if (!this.props.answered) {
      return (
        <div>
          <Button onClick={this.randomQuestion}>New question</Button>
          {this.props.user ? <Button onClick={this.deleteQuestion}>Delete</Button> : null}
          <div>
            <Latex code={this.props.currentQuestion.question} />
          </div>
          <Table collapsing unstackable>
            <Table.Body>
              {this.props.currentQuestion.answers.map(a =>
                <Table.Row key={a.id}>
                  <Table.Cell>
                    <Latex code={`${a.id})\\quad ${a.answer}`} />
                  </Table.Cell>
                  <Table.Cell>
                    <Button compact onClick={this.checkAnswer(a.id)}>Answer</Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      )
    } else {
      return (
        <div>
          <Button onClick={this.randomQuestion}>New question</Button>
          {this.props.user ? <Button onClick={this.deleteQuestion}>Delete</Button> : null}
          <div>
            <Latex code={this.props.currentQuestion.question} />
          </div>
          <Table collapsing unstackable>
            <Table.Body>
              {this.props.currentQuestion.answers.map(a =>
                <Table.Row key={a.id} positive={a.id === this.props.currentQuestion.correctAnswer} negative={a.id !== this.props.currentQuestion.correctAnswer}>
                  <Table.Cell>
                    <Latex code={`${a.id})\\quad ${a.answer}`} />
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
          <Grid>
            <Grid.Column>
              <Grid.Row>
                <Latex code={`\\text{Correct answer: } ${this.props.currentQuestion.correctAnswer})`} />
              </Grid.Row>
              <Grid.Row>
                <Latex code={`\\text{Your answer: } ${this.props.chosenAnswer})`} />
              </Grid.Row>
              <Grid.Row>
                <Latex code={`\\text{Explanation: } ${this.props.currentQuestion.explanation}`} />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
 return {
   currentQuestion: state.questions.currentQuestion,
   questions: state.questions.questions,
   currentCategory: state.categories.currentCategory,
   answered: state.answers.answered,
   user: state.users.user
 }
}

const mapDispatchToProps = {
  answer,
  randomQuestion,
  deleteCurrentQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)