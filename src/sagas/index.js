import { all, fork } from 'redux-saga/effects'
import applicationSagas from './applicationSagas'
import connectionSagas from './connectionSagas'

export default function* rootSaga() {
  yield all([
    fork(applicationSagas),
    fork(connectionSagas),
  ])
}
