import { combineReducers } from 'redux'
import actionPath from './action_path'
import date from './date'
import records from './records'
import record from './record'

const mainApp = combineReducers({
  actionPath,
  date,
  records,
  record,
})

export default mainApp
