import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './styles/index.scss'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()
export const store = configureStore({}, history)

ReactDOM.render(
  <Root history={history} store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
