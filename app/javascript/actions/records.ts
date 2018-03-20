import * as constants from '../constants'
import { Date, Record } from '../types/index'

export interface fetchRootProps {
  type: constants.FETCH_ROOT_RROPS_REQUESTED
  payload: {
    url: string
    pushState: boolean
    history: object
  }
}
export function fetchRootProps(url, { pushState }, history): fetchRootProps {
  return {
    type: constants.FETCH_ROOT_RROPS_REQUESTED,
    payload: {
      url,
      pushState,
      history,
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

export interface patchData {
  sort: string
  price: number
}
export interface patchRecord {
  type: constants.PATCH_RECORD_REQUESTED
  payload: {
    record: Record
    data: patchData
  }
}
export function patchRecord(record, data): patchRecord {
  return {
    type: constants.PATCH_RECORD_REQUESTED,
    payload: {
      record,
      data,
    },
  }
}

export interface deleteRecord {
  type: constants.DELETE_RECORD_REQUESTED
  payload: {
    record: Record
  }
}
export function deleteRecord(record: Record): deleteRecord {
  return {
    type: constants.DELETE_RECORD_REQUESTED,
    payload: {
      record,
    },
  }
}
