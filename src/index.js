import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import QuickReview from './QuickReview'
import { createStore } from 'redux'
const reviewReducer = require('./reducers/reviewReducer')

const store = createStore(reviewReducer)

const renderApp = () => {
  ReactDOM.render(<QuickReview store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
