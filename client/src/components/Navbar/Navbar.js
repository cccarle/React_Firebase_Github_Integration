import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SideNav from '../SideNav/SideNav'

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#E6EBE0'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navColor: {
    backgroundColor: '#43787B'
  }
}

function Navbar (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar className={classes.navColor} position='static'>
        <Toolbar>
          <SideNav className={classes.SideBarTextColor} />

          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
          />
          <Typography variant='h6' color='inherit' className={classes.grow}>
            Dashboard
          </Typography>
          <Button color='inherit'>
            <a href='http://localhost:9000/signout' rel='noopener noreferrer'>
              SIGN Out
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
