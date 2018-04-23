import { composeWithDevTools } from 'redux-devtools-extension'
import answerReducer from './reducers/answerReducer'
import categoryReducer from './reducers/categoryReducer'
import errorReducer from './reducers/errorReducer'
import questionReducer from './reducers/questionReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  answers: answerReducer,
  categories: categoryReducer,
  errors: errorReducer,
  questions: questionReducer,
  users: userReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store