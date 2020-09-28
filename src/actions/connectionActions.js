import { createAction } from "redux-actions"

export const setConnection = createAction('SET_CONNECTION')
export const setConnectionSuccess = createAction('SET_CONNECTION_SUCCESS')
export const setConnectionFail = createAction('SET_CONNECTION_FAIL')

export const closeConnection = createAction('CLOSE_CONNECTION')
export const closeConnectionSuccess = createAction('CLOSE_CONNECTION_SUCCESS')
export const closeConnectionFail = createAction('CLOSE_CONNECTION_FAIL')

export const connectionInProgressStart = createAction('CONNECTION_IN_PROGRESS_START')
export const connectionInProgressStop = createAction('CONNECTION_IN_PROGRESS_STOP')
export const connectionReconnect = createAction('CONNECTION_RECONNECT')
export const connectionPing = createAction('CONNECTION_PING')
export const connectionPong = createAction('CONNECTION_PONG')
export const connectionPingRetry = createAction('CONNECTION_PING_RETRY')

export const connectionClosed = createAction('CONNECTION_CLOSED')
export const receivedMessage = createAction('SOCKET_RECEIVED_MESSAGE')
