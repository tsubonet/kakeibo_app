import 'babel-polyfill'
import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter } from 'react-router-dom'
import Router from '../containers/router'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'

import auth from '../reducers/auth'
import date from '../reducers/date'
import records from '../reducers/records'
import recordsYear from '../reducers/records_year'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'

const history = createHistory()

const App = (props, railsContext) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [routerMiddleware(history), sagaMiddleware, logger]
  const rootReducer = combineReducers({
    auth,
    date,
    records,
    recordsYear,
    router: routerReducer,
  })
  const enhancer = compose(applyMiddleware(...middlewares), persistState('auth', { key: 'auth' }))
  const store = createStore(rootReducer, props, enhancer)
  sagaMiddleware.run(mySaga)

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  )
}

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
})
