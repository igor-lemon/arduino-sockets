import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import connection from './connection'

export default (history) => combineReducers({
  connection,
  router: connectRouter(history),
})
