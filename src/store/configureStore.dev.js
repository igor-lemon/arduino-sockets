import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createReducer from '../reducers'
import rootSaga from '../sagas'

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose
  let reduxSagaMonitorOptions = {}

  if (typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    }

    if (window.__SAGA_MONITOR_EXTENSION__) {
      reduxSagaMonitorOptions = {
        sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
      }
    }
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const middlewares = [sagaMiddleware, routerMiddleware(history)]

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer(state) {
      return Object.entries(state).reduce((result, [key, value]) => {
        const updatedResult = { ...result }

        updatedResult[key] = value

        return updatedResult
      }, {})
    },
  })

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middlewares.push(logger)
  }

  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  )

  sagaMiddleware.run(rootSaga, store.dispatch)

  store.close = () => store.dispatch(END)

  return store
}
