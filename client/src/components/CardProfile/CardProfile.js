import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import queryString from 'query-string'

const styles = theme => ({
  card: {
    maxWidth: 400,

  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
})

class CardProfile extends React.Component {
  state = {
    expanded: false,
    profile_avatar: '',
    loginName: '',
    name: ''
  }

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  componentDidMount () {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token

    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + accessToken }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          profile_avatar: data.avatar_url,
          loginName: data.login,
          name: data.name
        })
      })
  }

  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              {this.state.name.charAt(0)}
            </Avatar>
          }
          title={this.state.loginName}
        />
        <CardMedia
          className={classes.media}
          image={this.state.profile_avatar}
        />
      </Card>
    )
  }
}

CardProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardProfile)
