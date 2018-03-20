export function authenticate(email, password) {
  return {
    type: 'AUTHENTICATE_REQUESTED',
    payload: {
      email,
      password,
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
