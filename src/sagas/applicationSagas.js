import { takeEvery, put, call } from 'redux-saga/effects'
import * as R from 'ramda'
import { toast } from 'react-toastify'
import * as applicationActions from '../actions/applicationActions'
import { ERROR, SUCCESS, WARN } from '../const/messagesTypes'

const POSITION = toast.POSITION.TOP_RIGHT

function* sagaApplicationShowMessage({ payload }) {
  try {
    const type = R.prop('type', payload)
    const message = R.propOr('Unknown error...', 'message')(payload)

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
    yield call(() => toast.success(payload, { position: POSITION }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageFail({ payload }) {
  try {
    yield call(() => toast.error(payload, { position: POSITION }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageInfo({ payload }) {
  try {
    yield call(() => toast.info(payload, { position: POSITION }))
  } catch (error) {
    console.error('APP SAGA ERROR: ', error.message)
  }
}

function* sagaApplicationShowMessageWarning({ payload }) {
  try {
    yield call(() => toast.warn(payload, { position: POSITION }))
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
