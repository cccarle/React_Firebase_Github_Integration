import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { allowNotifications } from '../../utils/helpers'
import { saveReposToFireStore, saveOrgsToFireStore } from '../../utils/firebaseDB'
import { withStyles } from '@material-ui/core/styles'
// Components
import Navbar from '../Navbar/Navbar'
import RepoList from '../RepoList/RepoList'
import OrgsList from '../OrgsList/OrgsList'
import Notifcations from '../Notifications/Notifications'
import SubscriptionList from '../SubscriptionList/SubscriptionList'
import Profile from '../Profile/Profile'
import Spinner from '../Spinner/Spinner'
import styles from './Dashboard.style'

import {
	fetchUserDataFromGithubAPI
} from '../../actions'

class Dashboard extends Component {
	componentWillMount() {
		allowNotifications()
		saveReposToFireStore()
		saveOrgsToFireStore()
	}

	componentDidMount() {
		this.props.fetchUserDataFromGithubAPI()
	}

	toggelComponentToRender = () => {
		if (this.props.toggel.showNotifications) {
			return <Notifcations />
		} else if (this.props.toggel.showRepositories) {
			return <RepoList />
		} else if (this.props.toggel.showOrganization) {
			return <OrgsList />
		} else if (this.props.toggel.showSubscription) {
			return <SubscriptionList />
		}
		else {
			return <Profile />
		}
	}

	render() {
		const { classes } = this.props

		if (Object.entries(this.props.profile).length === 0 && this.props.profile.constructor === Object) {

			return (<div className={classes.container}>
				<div className={classes.spinner}>
					<Spinner className={classes.spinner} />
				</div>
			</div>)
		}

		return (
			<div>
				<Navbar />
				{this.toggelComponentToRender()}
			</div>
		)
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps, {
	fetchUserDataFromGithubAPI,
})(withStyles(styles)(Dashboard))
