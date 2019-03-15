import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allowNotifications, saveRepoToFireStore, saveOrgsToFireStore } from '../../utils/helpers';
// Components
import Navbar from '../Navbar/Navbar';
import RepoList from '../RepoList/RepoList';
import OrgsList from '../OrgsList/OrgsList';
import Notifcations from '../Notifications/Notifications';
import {
	checkIfUserIsLoggedIn,
	fetchReposDataGithubAPI,
	fetchUserDataFromGithubAPI,
} from '../../actions';

class Dashboard extends Component {
	componentDidMount() {
		this.props.fetchUserDataFromGithubAPI();
		allowNotifications();
		saveRepoToFireStore()
		saveOrgsToFireStore()
		this.props.fetchReposDataGithubAPI()
	}

	toggelComponentToRender = () => {
		if (this.props.toggel.showNotifications) {
			return <Notifcations />;
		} else if (this.props.toggel.showRepositories) {
			return <RepoList />;
		} else if (this.props.toggel.showOrganization) {
			return <OrgsList />;
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
	checkIfUserIsLoggedIn,
	fetchReposDataGithubAPI,
	fetchUserDataFromGithubAPI,
})(Dashboard);
