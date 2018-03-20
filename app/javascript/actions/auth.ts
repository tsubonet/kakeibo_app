export function authenticate(email, password) {
  return {
    type: 'AUTHENTICATE_REQUESTED',
    payload: {
      email,
      password,
    },
  }
}

export function signout() {
  return {
    type: 'SIGNOUT_REQUESTED',
  }
}
