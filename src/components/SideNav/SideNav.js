import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import CardProfile from '../CardProfile/CardProfile'

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  ButtonColor: {
    color: '#FFFFFF'
  }
}

class SideNav extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
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
        <List>
          <CardProfile />
          {['Inbox', 'Subscription', 'Notifications', 'Sign Out'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </div>
    )

    return (
      <div>
        <Button
          className={classes.ButtonColor}
          onClick={this.toggleDrawer('left', true)}
        >
          profile
        </Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SideNav)
