import { Route, Switch } from 'react-router'
import React from 'react'
import App from './containers/App'
import MainScreen from './Screens/MainScreen'

export const routesList = [
  {
    path: '/',
    component: MainScreen,
  }
]

const Routes = () => (
  <App>
    <Switch>
      {
        routesList.map((route) => (
          <Route path={route.path} component={route.component} key={route.path} exact />
        ))
      }
    </Switch>
  </App>
)

export default Routes
