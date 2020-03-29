import { all, fork } from 'redux-saga/effects'
import applicationSagas from './applicationSagas'

export default function* rootSaga() {
  yield all([
    fork(applicationSagas),
  ])
}
