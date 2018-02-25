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

export interface postData {
  sort: string
  price: number
  done_on: string
}
export interface postRecord {
  type: constants.POST_RECORD_REQUESTED
  payload: {
    data: postData
  }
}
export function postRecord(data: postData): postRecord {
  return {
    type: constants.POST_RECORD_REQUESTED,
    payload: {
      data,
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
