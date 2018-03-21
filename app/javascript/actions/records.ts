import * as constants from '../constants'
import { Date, Record } from '../types/index'

export interface postData {
  sort: string
  price: number
  done_on: string
}
export interface postRecord {
  type: constants.POST_RECORD_REQUESTED
  payload: {
    auth: object
    data: postData
  }
}
export function postRecord(auth, data: postData): postRecord {
  return {
    type: constants.POST_RECORD_REQUESTED,
    payload: {
      auth,
      data,
    },
  }
}

export interface patchData {
  sort: string
  price: number
}
export interface patchRecord {
  type: constants.PATCH_RECORD_REQUESTED
  payload: {
    auth: object
    record: Record
    data: patchData
  }
}
export function patchRecord(auth, record, data): patchRecord {
  return {
    type: constants.PATCH_RECORD_REQUESTED,
    payload: {
      auth,
      record,
      data,
    },
  }
}

export interface deleteRecord {
  type: constants.DELETE_RECORD_REQUESTED
  payload: {
    auth: object
    record: Record
  }
}
export function deleteRecord(auth, record: Record): deleteRecord {
  return {
    type: constants.DELETE_RECORD_REQUESTED,
    payload: {
      auth,
      record,
    },
  }
}
