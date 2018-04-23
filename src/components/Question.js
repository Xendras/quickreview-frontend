import React, { Component } from 'react'
import Latex from './Latex'
import questionService from '../services/questions'
import answerService from '../services/answers'
import { Button, Table, Grid } from 'semantic-ui-react'

class Question extends Component {

  checkAnswer = (answerId) => {
    return async () => {
      const answerObject = {
        question: this.props.store.getState().currentQuestion.id,
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
    const state = this.props.store.getState()
    let question = state.currentQuestion
    let randomIndex = 0
    const numberOfQuestions = state.filteredQuestions.length
    if (numberOfQuestions <= 1) {
      return randomIndex
    }
    while (state.currentQuestion === question) {
      randomIndex = Math.floor(Math.random() * numberOfQuestions)
      question = state.filteredQuestions[randomIndex]
    }
    return randomIndex
  }

  randomQuestion = () => {
    const randomIndex = this.generateNewRandomIndex()
    this.props.store.dispatch({
      type: 'RANDOM_QUESTION',
      data: randomIndex
    })
  }

  deleteQuestion = async () => {
    const state = this.props.store.getState()
    await questionService.remove(state.currentQuestion.id)
    this.props.store.dispatch({
      type: 'DELETE_CURRENT_QUESTION'
    })
  }

  render() {
    const state = this.props.store.getState()

    if (!state.currentQuestion) {
      return (
        <Button onClick={this.randomQuestion}>New question</Button>
      )
    }

    if (!state.answered) {
      return (
        <div>
          <Button onClick={this.randomQuestion}>New question</Button>
          {state.user ? <Button onClick={this.deleteQuestion}>Delete</Button> : null}
          <div>
            <Latex code={state.currentQuestion.question} />
          </div>
          <Table collapsing unstackable>
            <Table.Body>
              {state.currentQuestion.answers.map(a =>
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
          {state.user ? <Button onClick={this.deleteQuestion}>Delete</Button> : null}
          <div>
            <Latex code={state.currentQuestion.question} />
          </div>
          <Table collapsing unstackable>
            <Table.Body>
              {state.currentQuestion.answers.map(a =>
                <Table.Row key={a.id} positive={a.id === state.currentQuestion.correctAnswer} negative={a.id !== state.currentQuestion.correctAnswer}>
                  <Table.Cell>
                    <Latex code={`${a.id})\\quad ${a.answer}`} />
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
          <Grid>
            <Grid.Column>
              <Grid.Row>
                <Latex code={`\\text{Correct answer: } ${state.currentQuestion.correctAnswer})`} />
              </Grid.Row>
              <Grid.Row>
                <Latex code={`\\text{Your answer: } ${state.chosenAnswer})`} />
              </Grid.Row>
              <Grid.Row>
                <Latex code={`\\text{Explanation: } ${state.currentQuestion.explanation}`} />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

export default Question