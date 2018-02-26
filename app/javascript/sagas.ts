import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getRecord, postRecord, patchRecord, deleteRecord, loadingStart, loadingEnd } from './api'

function* handleFetchPootProps(action) {
  try {
    loadingStart()
    const { date, records, recordsYear } = yield call(getRecord, action.payload.url)
    yield put({ type: 'GET_DATE', date })
    if (typeof records !== 'undefined') {
      yield put({ type: 'GET_RECORDS', records })
    }
    if (typeof recordsYear !== 'undefined') {
      yield put({ type: 'GET_RECORDSYEAR', recordsYear })
    }
    if (action.payload.pushState) {
      action.payload.callback()
    }
    loadingEnd()
    window.scrollTo(0, 0)
  } catch (e) {
    loadingEnd()
  }
}

function* handlePostRecord(action) {
  const { status, record } = yield call(postRecord, action.payload.data)
  if (status === 'success') {
    yield put({ type: 'POST_RECORD', record })
  }
}

function* handlePatchRecord(action) {
  const { status, record } = yield call(patchRecord, action.payload.record, action.payload.data)
  if (status === 'success') {
    yield put({ type: 'PATCH_RECORD', record })
  }
}

function* handleDeleteRecord(action) {
  const { status, record } = yield call(deleteRecord, action.payload.record)
  if (status === 'success') {
    yield put({ type: 'DELETE_RECORD', record })
  }
}

function* mySaga() {
  yield takeLatest('FETCH_ROOT_RROPS_REQUESTED', handleFetchPootProps)
  yield takeLatest('POST_RECORD_REQUESTED', handlePostRecord)
  yield takeLatest('PATCH_RECORD_REQUESTED', handlePatchRecord)
  yield takeLatest('DELETE_RECORD_REQUESTED', handleDeleteRecord)
}

export default mySaga
