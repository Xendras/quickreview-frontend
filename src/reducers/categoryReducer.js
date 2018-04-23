const categoryReducer = (state = { categories: [], currentCategory: null }, action) => {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, categories: action.data.categories }
    case 'NEW_CATEGORY':
      return { ...state, categories: state.categories.concat(action.data) }
      case 'SELECT_CATEGORY':
      return {...state, currentCategory: action.data}
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

export const selectCategory = (category) => {
  return {
    type: 'SELECT_CATEGORY',
    data: category
  }
}

export const initData = (data) => {
  return {
    type: 'INIT_DATA',
    data: data
  }
}

export default categoryReducer