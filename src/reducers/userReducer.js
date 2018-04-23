const userReducer = (state = { users: [], user: null }, action) => {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, users: action.data.users }
    case 'LOGIN':
      return { ...state, user: action.data }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

export const login = (user) => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const initData = (data) => {
  return {
    type: 'INIT_DATA',
    data: data
  }
}

export default userReducer