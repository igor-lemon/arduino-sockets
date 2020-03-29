import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {reducer as notificationsReducer} from 'reapop'
import application from './application'

export default (history) => combineReducers({
  application,
  router: connectRouter(history),
  notifications: notificationsReducer()
})
