import 'babel-polyfill'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers/index'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, logger))
  sagaMiddleware.run(mySaga)

  return store
}
