import * as constants from '../constants'
import { Date, Record } from '../types/index'

export interface fetchRootProps {
  type: constants.FETCH_ROOT_RROPS_REQUESTED
  payload: {
    url: string
    pushState: boolean
    callback: any
  }
}
export function fetchRootProps(url, { pushState }, callback): fetchRootProps {
  return {
    type: constants.FETCH_ROOT_RROPS_REQUESTED,
    payload: {
      url: url,
      pushState: pushState,
      callback: callback,
    },
  }
}

export interface postRecord {
  type: constants.POST_RECORD_REQUESTED
  payload: {
    date: Date
    result: string
  }
}
export function postRecord(date, result): postRecord {
  return {
    type: constants.POST_RECORD_REQUESTED,
    payload: {
      date: date,
      result: result,
    },
  }
}

export interface patchRecord {
  type: constants.PATCH_RECORD_REQUESTED
  payload: {
    record: Record
    result: string
  }
}
export function patchRecord(record, result): patchRecord {
  return {
    type: constants.PATCH_RECORD_REQUESTED,
    payload: {
      record: record,
      result: result,
    },
  }
}

export interface deleteRecord {
  type: constants.DELETE_RECORD_REQUESTED
  payload: {
    record: Record
  }
}
export function deleteRecord(record): deleteRecord {
  return {
    type: constants.DELETE_RECORD_REQUESTED,
    payload: {
      record: record,
    },
  }
}
