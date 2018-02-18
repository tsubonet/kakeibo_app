import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'

import createHistory from 'history/createBrowserHistory'

import { BrowserRouter } from 'react-router-dom'
import RouterContainer from '../containers/router_container'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

import actionPath from '../reducers/action_path'
import date from '../reducers/date'
import records from '../reducers/records'
import record from '../reducers/record'

import mySaga from '../sagas'

const App = (props, railsContext) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      actionPath: actionPath,
      date: date,
      records: records,
      record: record,
      router: routerReducer,
    }),
    props,
    applyMiddleware(middleware, sagaMiddleware, logger)
  )
  sagaMiddleware.run(mySaga)

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RouterContainer />
      </ConnectedRouter>
    </Provider>
  )
}

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
})
