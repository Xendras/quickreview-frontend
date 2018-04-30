import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import QuickReview from './QuickReview'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <QuickReview />
    </Provider>,
  document.getElementById('root')
)

