import React from 'react'
import { connect } from 'react-redux'
import { deleteNotifications } from '../../actions'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'

import _ from 'lodash'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    marginTop: '3%',
    margin: 'auto',
    width: '50‰',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper
  },
  Button:{
    marginTop:10,
    marginRight: 110
  }
})

class FolderList extends React.Component {
  deleteNotificationsButton = () => {
    this.props.deleteNotifications()
  }
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.props.notifications.map(repos => (
          <List>
            <ListItem>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary={repos.title} secondary={repos.body} />
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
  { deleteNotifications }
)(withStyles(styles)(FolderList))
