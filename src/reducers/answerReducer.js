const answerReducer = (state = { answers: [], answered: false, chosenAnswer: '' }, action) => {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, answers: action.data.answers }
    case 'ANSWER':
      return { ...state, answered: true, chosenAnswer: action.data.answer, answers: state.answers.concat(action.data) }
    case 'RANDOM_QUESTION':
      return { ...state, answered: false, chosenAnswer: '' }
    default:
      return state
  }
}

export const answer = (answer) => {
  return {
    type: 'ANSWER',
    data: answer
  }
}

export default answerReducer