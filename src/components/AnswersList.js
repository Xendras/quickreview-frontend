import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import { Modal, Button, Table, Container } from 'semantic-ui-react'
import Latex from './Latex'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AnswersList extends React.Component {
  render() {
    console.log(this.props.answers)
    return (
      <div>
        <Table celled unstackable collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Answer</Table.HeaderCell>
              <Table.HeaderCell>Correct answer</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.answers.splice(0, 10).map(a =>
              <Table.Row key={a.id} positive={a.answer === a.question.correctAnswer} negative={a.answer !== a.question.correctAnswer}>
                <Table.Cell>
                  {a.question.question}
                  {/* <Latex code={a.question.question} /> */}
                </Table.Cell>
                <Table.Cell>
                  {a.answer}
                </Table.Cell>
                <Table.Cell>
                  {a.question.correctAnswer}
                </Table.Cell>
                <Table.Cell>
                  {a.date}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    answers: state.answers.answers
  }
}

export default withRouter(connect(mapStateToProps)(AnswersList))