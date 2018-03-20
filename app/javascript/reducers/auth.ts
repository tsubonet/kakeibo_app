const initialState = {
  loading: false,
  isAuthenticated: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_RECEIVED':
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: true,
        uid: action.uid,
        client: action.client,
        accessToken: action.accessToken,
        expiry: action.expiry,
      })
    case 'AUTH_SIGNOUT':
      return Object.assign({}, initialState)
    default:
      return state
  }
}
