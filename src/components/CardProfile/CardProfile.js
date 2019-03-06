import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUserDataFromGithubAPI } from '../../actions'

// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'

// Styles
import styles from './CardProfile.style'

class CardProfile extends React.Component {
  componentDidMount () {
    this.props.fetchUserDataFromGithubAPI()
  }

  renderImage = (profileAvatar, classes) => {
    if (profileAvatar.length < 1) {
    } else {
      return <CardMedia className={classes.media} image={profileAvatar} />
    }
  }
  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              {this.props.profileName.charAt(0)}
            </Avatar>
          }
          title={this.props.profileName}
        />
        {this.renderImage(this.props.profileAvatar, classes)}
      </Card>
    )
  }
}

CardProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { profileAvatar, profileName, githubURL } = state.profile

  return { profileAvatar, profileName, githubURL }
}
export default connect(
  mapStateToProps,
  { fetchUserDataFromGithubAPI }
)(withStyles(styles)(CardProfile))
