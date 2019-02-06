import React, { Component } from 'react'
import './App.css'
import NotSignedIn from '../NotSignedIn/NotSignedIn'
import Dashboard from '../Dashboard/Dashboard'
import queryString from 'query-string'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount () {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token

    if (accessToken) {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false })
    }
    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + accessToken }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
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
      <div className='App'>
      {this.isLoggedIn()}
      </div>
    )
  }
}

export default App
