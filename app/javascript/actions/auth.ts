export function authenticate(email, password, history) {
  return {
    type: 'AUTHENTICATE_REQUESTED',
    payload: {
      email,
      password,
      history,
    },
  }
}

export function signout(auth) {
  return {
    type: 'SIGNOUT_REQUESTED',
    payload: {
      auth,
    },
  }
}
