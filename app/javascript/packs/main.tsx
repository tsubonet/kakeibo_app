import 'babel-polyfill'
import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter } from 'react-router-dom'
import RouterContainer from '../containers/router_container'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import actionPath from '../reducers/action_path'
import date from '../reducers/date'
import record from '../reducers/record'
import records from '../reducers/records'
import recordsYear from '../reducers/records_year'
import budget from '../reducers/budget'
import budgetsYear from '../reducers/budgets_year'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'

const history = createHistory()
const middleware = routerMiddleware(history)

const App = (props, railsContext) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      actionPath,
      date,
      record,
      records,
      recordsYear,
      budget,
      budgetsYear,
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
