import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchNotifications } from '../../actions'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  list: {
    width: 300,
    marginTop: 10,
    marginBottom:10
  },
  fullList: {
    width: 'auto'
  },
  ButtonColor: {
    color: '#FFFFFF'
  }
}

class NotificationsSideNav extends React.Component {
  state = {
    right: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render () {
    const { classes } = this.props

    const sideList = (
      <div className={classes.list}>
        {this.props.notifications.map(repos => (
          <Paper className={classes.root} elevation={1}>
            <Typography variant='h5' component='h3'>
              {repos.title}
            </Typography>
            <Typography component='p'>{repos.body}</Typography>
          </Paper>
        ))}
      </div>
    )

    return (
      <div>
        <Button
          className={classes.ButtonColor}
          onClick={this.toggleDrawer('right', true)}
        >
          something
        </Button>
        <Drawer
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
        >
          <div
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

NotificationsSideNav.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const notifications = _.map(state.notification, val => {
    return { ...val }
  })

  return { notifications }
}

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(withStyles(styles)(NotificationsSideNav))
