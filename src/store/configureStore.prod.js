import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware, { END } from 'redux-saga'
import createReducer from '../reducers'
import rootSaga from '../sagas'

export default function configureStore(initialState = {}, history) {
  const composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const middlewares = [sagaMiddleware, routerMiddleware(history)]

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
