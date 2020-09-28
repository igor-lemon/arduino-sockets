import { fork, call, put, take, takeLatest, takeEvery, cancelled, cancel } from "redux-saga/effects"
import { store } from '../index';
import WebSocketConnection from "../utils/sockets"
import * as applicationActions from "../actions/applicationActions"
import * as connectionActions from "../actions/connectionActions"
import * as R from "ramda"

function* sagaSetConnectionSuccess() {
  yield put(applicationActions.applicationShowMessageSuccess('The connection was successfully'))
}

function* sagaSetConnectionFail({ payload }) {
  yield put(applicationActions.applicationShowMessageFail(payload))
}

function* sagaConnectionClosed() {
  yield put(applicationActions.applicationShowMessageFail('The connection was closed...'))
}

function* sagaCloseConnectionSuccess() {
  try {
    yield call(() => WebSocketConnection.closeSocketConnection())
    yield put(applicationActions.applicationShowMessageSuccess('WebSocket disconnected successfully'))
  } catch (error) {
    yield put(R.prop('message', error))
  }
}

function* socketConnect(payload) {
  let socket
  let socketChannel
  try {
    socket = yield call(WebSocketConnection.createWebSocketConnection, payload)

    socket.addEventListener('close', () => store.dispatch(connectionActions.connectionClosed()))

    yield call(() => socket.subscribe(
      'connectingStart',
      () => store.dispatch(connectionActions.connectionInProgressStart())
    ));
    yield call(() => socket.subscribe(
      'connectingEnd',
      () => store.dispatch(connectionActions.connectionInProgressStop())
    ));
    yield call(() => socket.subscribe(
      'reconnect',
      () => store.dispatch(connectionActions.connectionReconnect())
    ));

    socketChannel = yield call(WebSocketConnection.createSocketChannel)

    yield put(connectionActions.setConnectionSuccess())

    while (true) {
      const message = yield take(socketChannel)
      yield put(connectionActions.receivedMessage(message))
    }
  } catch (error) {
    yield put(connectionActions.setConnectionFail(`WebSocket connection error: ${R.prop('message', error)}`))
  }
}

function* sagaSetConnection({ payload }) {
  try {
    const socketTask = yield fork(socketConnect, payload)

    // when DISCONNECT action is dispatched, we cancel the socket task
    yield take(connectionActions.closeConnection)
    yield cancel(socketTask)
    yield put(connectionActions.closeConnectionSuccess())

  } catch (error) {
    yield put(applicationActions.applicationShowMessageFail(R.prop('message', error)))
  }
}

function* connectionSagas() {
  yield takeLatest(connectionActions.setConnection, sagaSetConnection)
  yield takeEvery(connectionActions.setConnectionFail, sagaSetConnectionFail)
  yield takeEvery(connectionActions.setConnectionSuccess, sagaSetConnectionSuccess)
  yield takeEvery(connectionActions.connectionClosed, sagaConnectionClosed)
  yield takeEvery(connectionActions.closeConnectionSuccess, sagaCloseConnectionSuccess)
}

export default connectionSagas
