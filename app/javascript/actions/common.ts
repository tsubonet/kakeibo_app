import * as constants from '../constants'
import { Auth } from '../types/index'

export function fetchRootProps(auth: Auth, url: string, history: object): object {
  return {
    type: constants.FETCH_ROOT_PROPS_REQUESTED,
    payload: {
      auth,
      url,
      history,
    },
  }
}
