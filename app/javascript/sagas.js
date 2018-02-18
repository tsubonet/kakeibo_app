import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getRecord, postRecord, patchRecord, deleteRecord, loadingStart, loadingEnd } from './api'

function* handleFetchPootProps(action) {
  try {
    loadingStart()
    const { actionPath, date, records, record } = yield call(getRecord, action.payload.url)
    if (action.payload.pushState) {
      history.pushState(null, '', action.payload.url)
    }
    yield put({ type: 'GET_ACTION_PATH', actionPath: actionPath })
    yield put({ type: 'GET_DATE', date: date })
    if (typeof records !== 'undefined') {
      yield put({ type: 'GET_RECORDS', records: records })
    }
    if (typeof record !== 'undefined') {
      yield put({ type: 'GET_RECORD', record: record })
    }
    loadingEnd()
    window.scrollTo(0, 0)
  } catch (e) {
    loadingEnd()
  }
}

function* handlePostRecord(action) {
  const { status, record } = yield call(postRecord, action.payload.date, action.payload.result)
  if (status === 'success') {
    yield put({ type: 'GET_RECORD', record: record })
  }
}

function* handlePatchRecord(action) {
  const { status, record } = yield call(patchRecord, action.payload.record, action.payload.result)
  if (status === 'success') {
    yield put({ type: 'GET_RECORD', record: record })
  }
}

function* handleDeleteRecord(action) {
  const { status } = yield call(deleteRecord, action.payload.record)
  if (status === 'success') {
    yield put({ type: 'DELETE_RECORD' })
  }
}

function* mySaga() {
  yield takeLatest('FETCH_ROOT_RROPS_REQUESTED', handleFetchPootProps)
  yield takeLatest('POST_RECORD_REQUESTED', handlePostRecord)
  yield takeLatest('PATCH_RECORD_REQUESTED', handlePatchRecord)
  yield takeLatest('DELETE_RECORD_REQUESTED', handleDeleteRecord)
}

export default mySaga
