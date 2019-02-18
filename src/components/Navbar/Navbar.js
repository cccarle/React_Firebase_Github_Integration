import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SideNav from '../SideNav/SideNav'
import { connect } from 'react-redux'
import { signOutUser } from '../../actions'
import styles from './Navbar.style'

class Navbar extends Component {
  signOutAttempt = () => {
    this.props.signOutUser()
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
  { signOutUser }
)(withStyles(styles)(Navbar))
