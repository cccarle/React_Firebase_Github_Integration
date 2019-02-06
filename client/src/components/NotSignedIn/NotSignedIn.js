import React, { Component } from 'react'
import './NotSignedIn.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    backgroundColor: '#E6EBE0'
  },
  input: {
    display: 'none'
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  }
})

function NotSignedIn (props) {
  const { classes } = props

  return (
    <div className='App'>
      <header className='App-header'>
        <p>WELCOME TO GITHUB DASHBOARD APPLICATION</p>

        <Button className={classes.button} variant='contained'>
          <a
            className={classes.link}
            href='http://localhost:9000/login'
            rel='noopener noreferrer'
          >
            sign in
          </a>
        </Button>
      </header>
    </div>
  )
}

NotSignedIn.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotSignedIn)
