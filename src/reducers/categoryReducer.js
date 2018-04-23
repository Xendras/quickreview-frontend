const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, categories: action.data.categories }
    case 'NEW_CATEGORY':
      return { ...state, categories: state.categories.concat(action.data) }
    default:
      return state
  }
}

export const newCategory = (category) => {
  return {
    type: 'NEW_CATEGORY',
    data: category
  }
}

export default categoryReducer