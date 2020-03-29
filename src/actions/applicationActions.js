import { createAction } from 'redux-actions'

export const appChannelsInit = createAction('App_CHANNELS_INIT')

export const applicationShowMessage = createAction('APP_SHOW_MESSAGE')
export const applicationShowMessageSuccess = createAction('APP_SHOW_MESSAGE_SUCCESS')
export const applicationShowMessageFail = createAction('APP_SHOW_MESSAGE_FAIL')
export const applicationShowMessageWarning = createAction('APP_SHOW_MESSAGE_WARN')
export const applicationShowMessageInfo = createAction('APP_SHOW_MESSAGE_INFO')

export const setConnection = createAction('APP_SET_CONNECTION')
export const setConnectionSuccess = createAction('APP_SET_CONNECTION_SUCCESS')
export const setConnectionFail = createAction('APP_SET_CONNECTION_FAIL')
