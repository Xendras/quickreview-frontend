const errorReducer = (state = { error: '', errorModal: false }, action) => {
  switch (action.type) {
    case 'ERROR':
      return { ...state, error: action.data, errorModal: true }
    case 'CLEAR_ERROR':
      return { ...state, error: '', errorModal: false }
    default:
      return state
  }
}

export const error = (error) => {
  return {
    type: 'ERROR',
    data: error
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

export default errorReducer