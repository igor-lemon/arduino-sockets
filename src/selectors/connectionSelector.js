import * as R from 'ramda'
import { createSelector } from 'reselect'
import { connectionMainSelector } from './index'

export const connectionIsConnectedStatusSelector = createSelector(
  connectionMainSelector,
  connection => R.prop("isConnected", connection)
)

export const connectionInProgressStatusSelector = createSelector(
  connectionMainSelector,
  connection => R.prop("inProcess", connection)
)

