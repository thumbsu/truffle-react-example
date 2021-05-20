import React from 'react'
import { browserHistory, Route, Router } from 'react-router'
import Count from './components/Count'


const renderRoutes = rootComponent => (
  <Router history={browserHistory}>
    <Route component={rootComponent}>
      <Route path="/" component={Count} />
    </Route>
  </Router>
)

export default renderRoutes