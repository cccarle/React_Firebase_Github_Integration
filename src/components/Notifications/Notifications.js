import React from 'react'
import { connect } from 'react-redux'
import { deleteNotifications, fetchNotifications } from '../../actions'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    maxWidth: 360,
    marginTop: '3%',
    margin: 'auto',
    width: '50‰',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper
  },
  Button: {
    marginTop: 10,
    marginRight: 110
  }
})

class FolderList extends React.Component {
  componentDidMount () {
    this.props.fetchNotifications()
  }
  deleteNotificationsButton = () => {
    this.props.deleteNotifications()
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {this.props.notifications.map(notification => (
          <List key={notification.eventURL}>
            <ListItem>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary={notification.title} secondary={notification.body} />
            </ListItem>
          </List>
        ))}
        <Button
          onClick={this.deleteNotificationsButton}
          variant='contained'
          color='primary'
          className={classes.Button}
        >
          Delete Notifications
        </Button>
      </div>
    )
  }
}

FolderList.propTypes = {
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
  { deleteNotifications, fetchNotifications }
)(withStyles(styles)(FolderList))
