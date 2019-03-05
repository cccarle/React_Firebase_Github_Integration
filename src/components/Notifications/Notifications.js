import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'

import _ from 'lodash'

import { connect } from 'react-redux'
import {} from '../../actions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper
  }
})

class FolderList extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <div>
        {this.props.notifications.map(repos => (
          <List className={classes.root}>
            <ListItem>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary={repos.title} secondary={repos.body} />
            </ListItem>
          </List>
        ))}
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
  {}
)(withStyles(styles)(FolderList))
