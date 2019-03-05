import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SideNav from '../SideNav/SideNav'
import { connect } from 'react-redux'
import { signOutUser, fetchNotifications, toggelOn } from '../../actions'
import styles from './Navbar.style'

class Navbar extends Component {
  componentDidMount () {
    this.props.fetchNotifications()
  }
  signOutAttempt = () => {
    this.props.signOutUser()
  }

  toggelNotification = () => {
    this.props.toggelOn()
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.navbarColor} position='static'>
          <Toolbar>
            <SideNav />

            <Typography variant='h6' color='inherit' className={classes.grow}>
              Github Dashboard
            </Typography>
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
  { signOutUser, fetchNotifications, toggelOn }
)(withStyles(styles)(Navbar))
