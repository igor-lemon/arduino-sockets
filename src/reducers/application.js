import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import * as applicationActions from '../actions/applicationActions'

const initialState = {
  isConnected: false,
  inProcess: false,
  status: '',
  error: '',
}

export default handleActions(
  {
    [applicationActions.setConnection]: (state) => R.mergeDeepRight(state, {
      isConnected: false,
      inProcess: true,
      error: '',
    }),
    [applicationActions.setConnectionSuccess]: (state) => R.mergeDeepRight(state, {
      isConnected: true,
      inProcess: false,
      error: '',
    }),
    [applicationActions.setConnectionFail]: (state, { payload }) => R.mergeDeepRight(state, {
      isConnected: false,
      inProcess: false,
      error: payload,
    }),
  },
  initialState
)
