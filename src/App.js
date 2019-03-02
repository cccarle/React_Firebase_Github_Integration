import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './config/history'
import { Provider } from 'react-redux'
import store from './config/store'
import Main from './components/Main'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path='/' component={Main} />
              />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
