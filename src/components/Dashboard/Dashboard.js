import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allowNotifications } from '../../utils/helpers';
import { saveReposToFireStore, saveOrgsToFireStore } from '../../utils/firebaseHelpers';

// Components
import Navbar from '../Navbar/Navbar';
import RepoList from '../RepoList/RepoList';
import OrgsList from '../OrgsList/OrgsList';
import Notifcations from '../Notifications/Notifications';
import SubscriptionList from '../SubscriptionList/SubscriptionList'
import Profile from '../Profile/Profile'

import {
	fetchReposDataGithubAPI,
	fetchUserDataFromGithubAPI,
	fetchOrgsDataGithubAPI,
	fetchNotifications,
	fetchSubscriptions
} from '../../actions';

class Dashboard extends Component {
	componentWillMount(){
		allowNotifications();
		saveReposToFireStore()
		saveOrgsToFireStore()
	}
	
	componentDidMount() {
		this.props.fetchUserDataFromGithubAPI();
		this.props.fetchReposDataGithubAPI()
		this.props.fetchOrgsDataGithubAPI()
		this.props.fetchNotifications()
		this.props.fetchSubscriptions()
	}

	toggelComponentToRender = () => {
		if (this.props.toggel.showNotifications) {
			return <Notifcations />;
		} else if (this.props.toggel.showRepositories) {
			return <RepoList />;
		} else if (this.props.toggel.showOrganization) {
			return <OrgsList />;
		} else if (this.props.toggel.showSubscription) {
			return <SubscriptionList />
		}
		else {
			return <Profile />
		}
	};

	render() {
		return (
			<div>
				<Navbar />
				{this.toggelComponentToRender()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, {
	fetchUserDataFromGithubAPI,
	fetchReposDataGithubAPI,
	fetchOrgsDataGithubAPI,
	fetchNotifications,
	fetchSubscriptions
})(Dashboard);
