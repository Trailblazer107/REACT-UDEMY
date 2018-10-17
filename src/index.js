import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Root from './Root'
import rootReducer from './reducers'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = createStore(rootReducer)
​
render(
  <Root store={store} />,
  document.getElementById('root')
)