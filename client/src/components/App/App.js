import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import NotSignedIn from '../NotSignedIn/NotSignedIn'
import Dashboard from '../Dashboard/Dashboard'



class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  isLoggedIn () {
    if (this.state.isLoggedIn === true) {
      return <Dashboard />
    } else {
      return <NotSignedIn />
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>{this.isLoggedIn()}</div>
        </Router>
      </Provider>
    )
  }
}

export default App
