import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import QuickReview from './QuickReview'

const questions = [
  {
    id: 1,
    question: '\\text{Calculate } 2^2',
    answers: [
      {
        id: 'a',
        answer: '4'
      },
      {
        id: 'b',
        answer: '2'
      },
      {
        id: 'c',
        answer: '0'
      }
    ],
    correctAnswer: 'a',
    explanation: '\\text{That\'s how exponents work}'
  },
  {
    id: 2,
    question: '\\text{Solve the equation } \blockkatex-block x^2-4=0 \block',
    answers: [
      {
        id: 'a',
        answer: '4'
      },
      {
        id: 'b',
        answer: '2 \\text{ and } -2'
      },
      {
        id: 'c',
        answer: '2'
      }
    ],
    correctAnswer: 'b',
    explanation: '\\text{Conjugate rule}'
  },
  {
    id: 3,
    question: '\\text{Evaluate the infinite sum }\blockkatex-block \\sum^\\infty_{n=0}\\frac{1}{n}\block',
    answers: [
      {
        id: 'a',
        answer: '1'
      },
      {
        id: 'b',
        answer: '0'
      },
      {
        id: 'c',
        answer: '\\infty'
      }
    ],
    correctAnswer: 'c',
    explanation: '\\text {Harmonic series}'
  }
]

ReactDOM.render(<QuickReview questions={questions} />, document.getElementById('root'))
