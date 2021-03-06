import * as constants from './constants'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  transitTo,
  postRecord,
  patchRecord,
  deleteRecord,
  loadingStart,
  loadingEnd,
  authenticate,
  signout,
} from './api'

function* handleFetchRootProps(action) {
  try {
    yield call(loadingStart)
    const { date, records, recordsYear } = yield call(transitTo, action.payload.auth, action.payload.url)
    if (typeof date !== 'undefined') {
      yield put({ type: 'GET_DATE', date })
    }
    if (typeof records !== 'undefined') {
      yield put({ type: 'GET_RECORDS', records })
    }
    if (typeof recordsYear !== 'undefined') {
      yield put({ type: 'GET_RECORDSYEAR', recordsYear })
    }
    if (typeof action.payload.history !== 'undefined') {
      action.payload.history.push(action.payload.url)
    }
    yield call(loadingEnd)
    window.scrollTo(0, 0)
  } catch (e) {
    yield call(loadingEnd)
  }
}

function* handlePostRecord(action) {
  yield call(loadingStart)
  const { status, record } = yield call(postRecord, action.payload.auth, action.payload.data)
  if (status === 201) {
    yield put({ type: 'POST_RECORD', record })
  }
  yield call(loadingEnd)
}

function* handlePatchRecord(action) {
  yield call(loadingStart)
  const { status, record } = yield call(patchRecord, action.payload.auth, action.payload.record, action.payload.data)
  if (status === 200) {
    yield put({ type: 'PATCH_RECORD', record })
  }
  yield call(loadingEnd)
}

function* handleDeleteRecord(action) {
  yield call(loadingStart)
  const { status } = yield call(deleteRecord, action.payload.auth, action.payload.record)
  if (status === 200) {
    yield put({ type: 'DELETE_RECORD', record: action.payload.record })
  }
  yield call(loadingEnd)
}

function* handleAuthenticate(action) {
  yield call(loadingStart)
  const { status, uid, client, accessToken, expiry } = yield call(
    authenticate,
    action.payload.email,
    action.payload.password
  )
  if (status === 200) {
    const auth = yield put({ type: 'AUTH_RECEIVED', uid, client, accessToken, expiry })
    yield put({
      type: constants.FETCH_ROOT_PROPS_REQUESTED,
      payload: {
        auth: auth,
        url: '/',
        history: action.payload.history,
      },
    })
  } else {
    yield put({ type: 'AUTH_FAILED' })
  }
  yield call(loadingEnd)
}

function* handleSignOut(action) {
  yield call(loadingStart)
  const { status } = yield call(signout, action.payload.auth)
  if (status === 200) {
    yield put({ type: 'AUTH_SIGNOUT' })
  }
  yield call(loadingEnd)
}

function* mySaga() {
  yield takeLatest('FETCH_ROOT_PROPS_REQUESTED', handleFetchRootProps)

  yield takeLatest('POST_RECORD_REQUESTED', handlePostRecord)
  yield takeLatest('PATCH_RECORD_REQUESTED', handlePatchRecord)
  yield takeLatest('DELETE_RECORD_REQUESTED', handleDeleteRecord)

  yield takeLatest('AUTHENTICATE_REQUESTED', handleAuthenticate)
  yield takeLatest('SIGNOUT_REQUESTED', handleSignOut)
}

export default mySaga
