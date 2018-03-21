import * as constants from '../constants'

export interface fetchRootProps {
  type: constants.FETCH_ROOT_RROPS_REQUESTED
  payload: {
    auth: object
    url: string
    history: object
  }
}
export function fetchRootProps(auth, url, history): fetchRootProps {
  return {
    type: constants.FETCH_ROOT_RROPS_REQUESTED,
    payload: {
      auth,
      url,
      history,
    },
  }
}
