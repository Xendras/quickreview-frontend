const reviewReducer = (state = { questions: [], categories: [] }, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return { ...state, questions: state.questions.concat(action.data) }
    case 'NEW_CATEGORY':
      return { ...state, categories: state.categories.concat(action.data) }
    case 'INIT_QUESTIONS':
      return { ...state, questions: action.data}
    case 'INIT_CATEGORIES':
      return { ...state, categories: action.data}
    case 'ANSWER':
      return state
    case 'RANDOM_QUESTION':
      return state
  }
  return state
}

module.exports = reviewReducer