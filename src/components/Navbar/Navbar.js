import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  signOutUser,
  showRepositories,
  showNotification,
  showOrganizations
} from '../../actions'
import history from '../../config/history'

// Styles
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SideNav from '../SideNav/SideNav'
import styles from './Navbar.style'

class Navbar extends Component {
  signOutAttempt = () => {
    this.props.signOutUser()
  }

  toggelNotification = () => {
    this.props.showNotification()
  }

  toggelRepositories = () => {
    this.props.showRepositories()
  }

  toggelOrganizations = () => {
    this.props.showOrganizations()
  }

  toggelLandingPage = () => {
    // this.showLandingPage()
  }
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.navbarColor} position='static'>
          <Toolbar>
            <div>
              <Typography className={classes.grow} variant='h6' color='inherit'>
                Github Dashboard
              </Typography>{' '}
            </div>
            <SideNav />

            <div className={classes.ButtonContainer}>
              <Button onClick={this.toggelOrganizations} color='inherit'>
                Organizations
              </Button>
              <Button onClick={this.toggelRepositories} color='inherit'>
                Repositories
              </Button>
              <Button onClick={this.toggelNotification} color='inherit'>
                Notifications
              </Button>
              <Button onClick={this.signOutAttempt} color='inherit'>
                Sign out
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  null,
  { signOutUser, showRepositories, showNotification, showOrganizations }
)(withStyles(styles)(Navbar))
