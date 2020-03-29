import { takeEvery, takeLatest, put, call, take, actionChannel } from 'redux-saga/effects'
import * as R from 'ramda'
import { notify } from 'reapop'
import * as applicationActions from '../actions/applicationActions'
import {
  ERROR,
  ERROR_TITLE,
  SUCCESS,
  SUCCESS_TITLE,
  WARN,
  WARN_TITLE,
} from '../const/messagesTypes'

const DISMISSABLE = true
const DISMISS_AFTER = 3000

function* sagaApplicationShowMessage({ payload }) {
  try {
    const type = R.prop('type', payload)
    const message = R.prop('message', payload)

    switch (type) {
      case SUCCESS:
        yield put(applicationActions.applicationShowMessageSuccess(message))
        break
      case ERROR:
        yield put(applicationActions.applicationShowMessageFail(message))
        break
      case WARN:
        yield put(applicationActions.applicationShowMessageWarning(message))
        break
      default:
        yield put(applicationActions.applicationShowMessageInfo(message))
    }
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageSuccess({ payload }) {
  try {
    yield call(() => notify({
      title: SUCCESS_TITLE,
      message: payload,
      status: 'success',
      dismissible: DISMISSABLE,
      dismissAfter: DISMISS_AFTER
    }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageFail({ payload }) {
  try {
    yield call(() => notify({
      title: ERROR_TITLE,
      message: payload,
      status: 'error',
      dismissible: DISMISSABLE,
      dismissAfter: DISMISS_AFTER
    }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageInfo({ payload }) {
  try {
    yield call(() => notify({
      message: payload,
      status: 'info',
      dismissible: DISMISSABLE,
      dismissAfter: DISMISS_AFTER
    }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageWarning({ payload }) {
  try {
    yield call(() => notify({
      title: WARN_TITLE,
      message: payload,
      status: 'warning',
      dismissible: DISMISSABLE,
      dismissAfter: DISMISS_AFTER
    }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* applicationSagas() {
  yield takeEvery(applicationActions.applicationShowMessageSuccess, sagaApplicationShowMessageSuccess)
  yield takeEvery(applicationActions.applicationShowMessageFail, sagaApplicationShowMessageFail)
  yield takeEvery(applicationActions.applicationShowMessageInfo, sagaApplicationShowMessageInfo)
  yield takeEvery(applicationActions.applicationShowMessageWarning, sagaApplicationShowMessageWarning)
  yield takeEvery(applicationActions.applicationShowMessage, sagaApplicationShowMessage)
}

export default applicationSagas
