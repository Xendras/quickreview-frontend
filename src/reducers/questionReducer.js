const questionReducer = (state = { questions: [], currentQuestions: null }, action) => {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, questions: action.data.questions}
    case 'NEW_QUESTION':
      return { ...state, questions: state.questions.concat(action.data) }
    case 'RANDOM_QUESTION':
      const randomIndex = action.data.index
      const filteredQuestions = state.questions.filter(q => q.category._id === action.data.currentCategory)
      return { ...state, currentQuestion: filteredQuestions[randomIndex] }
    case 'DELETE_CURRENT_QUESTION':
      return { ...state, questions: state.questions.filter(q => q.id !== state.currentQuestion.id), currentQuestion: null }
    default:
      return state
  }
}

export const newQuestion = (question) => {
  return {
    type: 'NEW_QUESTION',
    data: question
  }
}

export const randomQuestion = (index, currentCategory) => {
  return {
    type: 'RANDOM_QUESTION',
    data: { index, currentCategory }
  }
}

export const deleteCurrentQuestion = () => {
  return {
    type: 'DELETE_CURRENT_QUESTION'
  }
}

export const initData = (data) => {
  return {
    type: 'INIT_DATA',
    data: data
  }
}

export default questionReducer