import * as constants from '../constants'
import { Auth } from '../types/index'

export function authenticate(email: string, password: string, history: object): object {
  return {
    type: constants.AUTHENTICATE_REQUESTED,
    payload: {
      email,
      password,
      history,
    },
  }
}

export function signout(auth: Auth): object {
  return {
    type: constants.SIGNOUT_REQUESTED,
    payload: {
      auth,
    },
  }
}
