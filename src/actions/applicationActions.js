import { createAction } from 'redux-actions'

export const applicationShowMessage = createAction('APP_SHOW_MESSAGE')
export const applicationShowMessageSuccess = createAction('APP_SHOW_MESSAGE_SUCCESS')
export const applicationShowMessageFail = createAction('APP_SHOW_MESSAGE_FAIL')
export const applicationShowMessageWarning = createAction('APP_SHOW_MESSAGE_WARN')
export const applicationShowMessageInfo = createAction('APP_SHOW_MESSAGE_INFO')
