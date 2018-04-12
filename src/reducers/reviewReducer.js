const reviewReducer = (state = { questions: [], categories: [] }, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return { ...state, questions: state.questions.concat(action.data) }
    case 'NEW_CATEGORY':
      return { ...state, categories: state.categories.concat(action.data) }
    case 'INIT_DATA':
      return { ...state, questions: action.data.questions, categories: action.data.categories }
    case 'ANSWER':
      return {...state, answered: true, chosenAnswer: action.data.chosenAnswer}
    case 'RANDOM_QUESTION':
      return {...state, currentQuestion: state.questions[action.data], answered: false, chosenAnswer: ''}
  }
  return state
}

module.exports = reviewReducer