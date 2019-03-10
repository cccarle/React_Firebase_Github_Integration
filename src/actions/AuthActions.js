import { LOGGED_IN_SUCCES, SIGN_OUT } from './types';
import firebase from '../config/firebase';
import history from '../config/history';
import * as Firebase from 'firebase';

export const checkIfUserIsLoggedIn = () => {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				let userID = user.providerData[0].uid;
				checkIfUserOnline(userID);
				dispatch({ type: LOGGED_IN_SUCCES, payload: true });
				history.push('/dashboard');
			} else {
				dispatch({ type: SIGN_OUT, payload: false });
			}
		});
	};
};

export const signInUser = (userData) => {
	return (dispatch) => {
		let provider = new Firebase.auth.GithubAuthProvider();

		provider.addScope('user');
		provider.addScope('repo');

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function(result) {
				dispatch({ type: LOGGED_IN_SUCCES, payload: true });
				let accessToken = result.credential.accessToken;
				window.localStorage.setItem('token', accessToken);
				history.push('/dashboard');
			})
			.catch(function(error) {
				let { errorCode, errorMessage } = error;
				console.log(
					`Something went wrong please check your credentials or try again. error message : ${errorMessage} - ${errorCode}`
				);
			});
	};
};

export const signOutUser = (userData) => {
	return (dispatch) => {
		firebase
			.auth()
			.signOut()
			.then(function() {
				dispatch({ type: SIGN_OUT, payload: false });
				console.log('sign out succesfull');
				history.push('/');
			})
			.catch(function(error) {
				console.log('error accurred' + error);
			});
	};
};

export const checkIfUserOnline = (uid) => {
	var userStatusDatabaseRef = firebase.database().ref('/users/' + uid);

	var isOfflineForDatabase = {
		state: 'offline',
		last_changed: Firebase.database.ServerValue.TIMESTAMP
	};

	var isOnlineForDatabase = {
		state: 'online',
		last_changed: Firebase.database.ServerValue.TIMESTAMP
	};

	firebase.database().ref('.info/connected').on('value', function(snapshot) {
		if (snapshot.val() === false) {
			return;
		}
		userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
			userStatusDatabaseRef.set(isOnlineForDatabase);
		});
	});
};
