import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SideNav from '../SideNav/SideNav'
import { connect } from 'react-redux'
import {
  signOutUser,
  showRepositories,
  showNotification,
  showOrganizations
} from '../../actions'
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

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.navbarColor} position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              Github Dashboard
            </Typography>
            <SideNav />

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
