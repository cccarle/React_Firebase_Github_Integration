import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../../actions';
// Components
import Navbar from '../Navbar/Navbar';
import RepoList from '../RepoList/RepoList';
import OrgsList from '../OrgsList/OrgsList';
import Notifcations from '../Notifications/Notifications';
import { checkIfUserIsLoggedIn } from '../../actions';
import firebase from '../../config/firebase';
let db = firebase.firestore();

class Dashboard extends Component {
	componentDidMount() {
		this.props.checkIfUserIsLoggedIn();

		const messaging = firebase.messaging();
		messaging
			.requestPermission()
			.then(() => {
				console.log('have permission');
				return messaging.getToken();
			})
			.then((token) => {
				var user = firebase.auth().currentUser;

				var userRef = db.collection('users').doc(user.providerData[0].uid);

				var setWithMerge = userRef.set(
					{
						msgToken: token
					},
					{ merge: true }
				);

				console.log(token);
			})
			.catch((err) => {
				console.log(err);
			});

		messaging.onMessage((payload) => {
			console.log('onMesage', payload);
		});
	}
	renderRepoOrNotificatin = () => {
		if (this.props.toggel.showNotifications === true) {
			return <Notifcations />;
		} else if (this.props.toggel.showRepositories === true) {
			return <RepoList />;
		} else if (this.props.toggel.showOrganization === true) {
			return <OrgsList />;
		}
	};
	render() {
		return (
			<div>
				<Navbar />
				{this.renderRepoOrNotificatin()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, { checkIfUserIsLoggedIn })(Dashboard);
