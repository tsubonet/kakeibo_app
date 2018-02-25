import NProgress from 'nprogress'
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
  console.log(data)
  return sendPost('/records', data)
}

export const patchRecord = (record, result) => {
  return sendPatch(`/records/${record.id}`, {
    result: result,
  })
}

export const deleteRecord = record => {
  return sendDelete(`/records/${record.id}`)
}
