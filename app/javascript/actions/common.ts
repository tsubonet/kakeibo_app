import * as constants from '../constants'

export interface fetchRootProps {
  type: constants.FETCH_ROOT_RROPS_REQUESTED
  payload: {
    url: string
    pushState: boolean
    history: object
    auth: any
  }
}
export function fetchRootProps(url, { pushState }, history, auth): fetchRootProps {
  return {
    type: constants.FETCH_ROOT_RROPS_REQUESTED,
    payload: {
      url,
      pushState,
      history,
      auth,
    },
  }
}
