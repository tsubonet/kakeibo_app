export function authenticate(email, password) {
  return {
    type: 'AUTHENTICATE_REQUESTED',
    payload: {
      email,
      password,
    },

    // return (dispatch, getState) => {
    //   dispatch(startAuthentication())
    //   return axios({
    //     url: '/auth/sign_in',
    //     method: 'POST',
    //     data: { email, password },
    //   })
    //     .then(response => {
    //       const uid = response.headers['uid']
    //       const client = response.headers['client']
    //       const accessToken = response.headers['access-token']
    //       const expiry = response.headers['expiry']
    //       dispatch(successAuthentication(uid, client, accessToken, expiry))
    //     })
    //     .catch(error => {
    //       dispatch(failAuthentication())
    //     })
    // }
  }

  // export function signout() {
  //   return (dispatch, getState) => {
  //     const { auth } = getState()
  //     return axios({
  //       url: '/auth/sign_out',
  //       method: 'DELETE',
  //       headers: {
  //         'access-token': auth.accessToken,
  //         client: auth.client,
  //         uid: auth.uid,
  //       },
  //     })
  //       .then(response => {
  //         dispatch(doSignout())
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }
}

export function signout() {
  return {
    type: 'SIGNOUT_REQUESTED',
  }
}
