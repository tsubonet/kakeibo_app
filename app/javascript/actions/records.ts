import * as constants from '../constants'
import { Date, Record, Auth } from '../types/index'

export interface postData {
  sort: string
  price: number
  done_on: string
}
export function postRecord(auth: Auth, data: postData): object {
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
export function patchRecord(auth: Auth, record: Record, data: patchData): object {
  return {
    type: constants.PATCH_RECORD_REQUESTED,
    payload: {
      auth,
      record,
      data,
    },
  }
}

export function deleteRecord(auth: Auth, record: Record): object {
  return {
    type: constants.DELETE_RECORD_REQUESTED,
    payload: {
      auth,
      record,
    },
  }
}
