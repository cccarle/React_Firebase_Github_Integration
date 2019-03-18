import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signOutUser, showRepositories, showNotification, showOrganizations, showProfile, showSubscriptions, clearNotification, fetchReposDataGithubAPI, fetchOrgsDataGithubAPI, fetchNotifications, fetchSubscriptions } from '../../actions'
import { updateNotifications } from '../../utils/firebaseDB'
import _ from 'lodash'

// Styles
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styles from './Navbar.style'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'

class Navbar extends Component {

	componentWillMount() {
		this.props.fetchNotifications()
	}

	signOutAttempt = () => {
		this.props.signOutUser()
	}

	toggelProfile = () => {
		this.props.showProfile()
	}

	toggelRepositories = () => {
		this.props.showRepositories()
		this.props.fetchReposDataGithubAPI()

	}

	toggelOrganizations = () => {
		this.props.showOrganizations()
		this.props.fetchOrgsDataGithubAPI()

	}

	toggelSubscriptions = () => {
		this.props.showSubscriptions()
		this.props.fetchSubscriptions()
	}

	toggelNotification = (prop) => {
		this.props.showNotification()
		updateNotifications(prop)
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<AppBar color="primary" className={classes.navbarColor} position="static">
					<Toolbar>
						<div>
							<Typography className={classes.grow} variant="overline" color="inherit">
								Github Dashboard
							</Typography>
						</div>

						<div className={classes.ButtonContainer}>
							<Button onClick={this.toggelProfile} color="inherit">

								<Typography variant="overline" color="inherit">
									Profile
					</Typography>
							</Button>
							<Button onClick={this.toggelOrganizations} color="inherit">

								<Typography variant="overline" color="inherit">
									Organizations
							</Typography>
							</Button>
							<Button onClick={this.toggelRepositories} color="inherit">
								<Typography variant="overline" color="inherit">
									Repositories
						</Typography>
							</Button>

							<Button onClick={this.toggelSubscriptions} color="inherit">
								<Typography variant="overline" color="inherit">
									My Subscriptions
					</Typography>
							</Button>
							<Button onClick={() => this.toggelNotification(this.props)} color="inherit">
								<Badge
									className={classes.margin}
									badgeContent={this.props.notificationsLength.length}
									color="secondary"
								>
									<MailIcon />
								</Badge>
							</Button>
							<Button onClick={this.signOutAttempt} color="inherit">
								<Typography variant="overline" color="inherit">
									Sign out
							</Typography>
							</Button>

						</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	const notificationsLength = _.map(state.notificationLength, (val) => {
		return { ...val }
	})

	return { notificationsLength }
}

export default connect(mapStateToProps, {
	signOutUser,
	showRepositories,
	showNotification,
	showOrganizations,
	showSubscriptions,
	showProfile,
	clearNotification,
	fetchReposDataGithubAPI,
	fetchOrgsDataGithubAPI,
	fetchNotifications,
	fetchSubscriptions
})(withStyles(styles)(Navbar))
