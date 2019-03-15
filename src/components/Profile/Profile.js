import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUserDataFromGithubAPI } from '../../actions'
import CardProfile from '../CardProfile/CardProfile'
// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// Styles
import styles from './Profile.style'

class Profile extends React.Component {
  render () {
    const { classes } = this.props
    console.log(this.props.profile)
    return (

      <div className={classes.root}>
 
        <div className={classes.githubStatsContainer}>

          <div className={classes.headerText} >
            <Typography variant='overline' color='inherit'>
                            Github Overview
            </Typography>


            <Typography variant='overline' color='inherit'>
            Logged in user : {this.props.profile.login}
</Typography>

            <div className={classes.underlineContainer}>
            <Typography className={classes.text} variant='overline' color='inherit'>
                            Private Repos
              <hr />
              <Typography className={classes.numberText} variant='overline' color='inherit'>
                {this.props.profile.total_private_repos}
              </Typography>
            </Typography>

            <Typography className={classes.text} variant='overline' color='inherit'>
                            Public Repos
              <hr />

              <Typography className={classes.numberText} variant='overline' color='inherit'>
                {this.props.profile.public_repos}
              </Typography>

            </Typography>
            <Typography className={classes.text} variant='overline' color='inherit'>
                            Followers
              <hr />
              <Typography className={classes.numberText} variant='overline' color='inherit'>
                {this.props.profile.followers}
              </Typography>
            </Typography>
          </div>
            </div>


        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, { fetchUserDataFromGithubAPI })(withStyles(styles)(Profile))
