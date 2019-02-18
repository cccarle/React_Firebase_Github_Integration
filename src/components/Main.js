import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInUser, checkIfUserIsLoggedIn } from '../actions'
import styles from './Main.style'

class Main extends Component {
  componentWillMount () {
    this.props.checkIfUserIsLoggedIn()
  }

  signInAttempt = () => {
    this.props.signInUser()
  }

  render () {
    return (
      <div className={styles.containerStyle}>
        <p>Welcome to github dashboard</p>
        <div>
          Sign in here
          <button onClick={this.signInAttempt}>Log in</button>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { signInUser, checkIfUserIsLoggedIn }
)(Main)

