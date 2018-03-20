import NProgress from 'nprogress'
import axios from 'axios'
import { sendGet, sendPost, sendPatch, sendDelete } from './utils'

export const loadingStart = () => {
  return NProgress.start()
}

export const loadingEnd = () => {
  return NProgress.done()
}

export const getRecord = url => {
  return sendGet(url)
}

export const postRecord = data => {
  return sendPost('/records', data)
}

export const patchRecord = (record, data) => {
  return sendPatch(`/records/${record.id}`, data)
}

export const deleteRecord = record => {
  return sendDelete(`/records/${record.id}`)
}

export const authenticate = (email, password) => {
  return axios
    .post(
      `/auth/sign_in`,
      { email, password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
        'access-token': auth.accessToken,
        client: auth.client,
        uid: auth.uid,
      },
    })
    .then(response => response)
    .catch(error => error.response)
}
