import NProgress from 'nprogress'
import axios from 'axios'
import { sendGet, sendPost, sendPatch, sendDelete } from './utils'

export const loadingStart = () => {
  return NProgress.start()
}

export const loadingEnd = () => {
  return NProgress.done()
}

export const transitTo = (auth, url) => {
  return sendGet(url, {
    'access-token': auth.accessToken,
    client: auth.client,
    uid: auth.uid,
    expiry: auth.expiry,
  })
}

export const postRecord = (auth, data) => {
  return sendPost('/records', data, {
    'access-token': auth.accessToken,
    client: auth.client,
    uid: auth.uid,
    expiry: auth.expiry,
  })
}

export const patchRecord = (auth, record, data) => {
  return sendPatch(`/records/${record.id}`, data, {
    'access-token': auth.accessToken,
    client: auth.client,
    uid: auth.uid,
    expiry: auth.expiry,
  })
}

export const deleteRecord = (auth, record) => {
  return sendDelete(`/records/${record.id}`, {
    'access-token': auth.accessToken,
    client: auth.client,
    uid: auth.uid,
    expiry: auth.expiry,
  })
}

export const authenticate = (email, password) => {
  return axios
    .post(
      '/auth/sign_in',
      { email, password },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    .then(response => {
      const status = response.status
      const uid = response.headers['uid']
      const client = response.headers['client']
      const accessToken = response.headers['access-token']
      const expiry = response.headers['expiry']
      return {
        status,
        uid,
        client,
        accessToken,
        expiry,
      }
    })
    .catch(error => error.response)
}

export const signout = auth => {
  return axios
    .delete('/auth/sign_out', {
      headers: {
        Accept: 'application/json',
        'access-token': auth.accessToken,
        client: auth.client,
        uid: auth.uid,
      },
    })
    .then(response => response)
    .catch(error => error.response)
}
