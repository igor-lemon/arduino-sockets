import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import * as connectionActions from '../actions/connectionActions'

const initialState = {
  isConnected: false,
  inProcess: false,
  status: '',
  error: '',
}

export default handleActions(
  {
    [connectionActions.setConnection]: (state) => R.mergeDeepRight(state, {
      isConnected: false,
      inProcess: true,
      error: '',
    }),
    [connectionActions.setConnectionSuccess]: (state) => R.mergeDeepRight(state, {
      isConnected: true,
      inProcess: false,
      error: '',
    }),
    [connectionActions.setConnectionFail]: (state, { payload }) => R.mergeDeepRight(state, {
      isConnected: false,
      inProcess: false,
      error: payload,
    }),
    [connectionActions.connectionInProgressStart]: (state) => R.mergeDeepRight(state, {
      inProcess: true
    }),
    [connectionActions.connectionInProgressStop]: (state) => R.mergeDeepRight(state, {
      inProcess: false
    }),
    [connectionActions.closeConnectionSuccess]: (state) => R.mergeDeepRight(state, initialState),
    [connectionActions.connectionClosed]: (state) => R.mergeDeepRight(state, initialState),
  },
  initialState
)
