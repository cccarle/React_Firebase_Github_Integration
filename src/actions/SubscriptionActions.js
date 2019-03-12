import { ADD_WEBHOOK, DELETE_WEBHOOK } from './types';
import firebase from '../config/firebase';
var db = firebase.firestore();

export const addWebhook = (webhookURL) => {
	return (dispatch) => {
		const accessToken = window.localStorage.getItem('token');

		let user = firebase.auth().currentUser;

		console.log(user.uid);

		let configData = {
			url: `https://us-central1-guthubdashboard.cloudfunctions.net/events?id=${user.uid}`,
			content_type: 'json'
		};

		console.log(webhookURL);

		let data = { events: [ 'issues', 'push' ], name: 'web', config: configData };

		window
			.fetch(webhookURL, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					Authorization: 'token ' + accessToken,
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((data) => {
				dispatch({ type: ADD_WEBHOOK, payload: data });
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const turnOffNotifications = (webhookURL) => {
	return (dispatch) => {
		const accessToken = window.localStorage.getItem('token');

		let configData = {
			url: 'https://us-central1-guthubdashboard.cloudfunctions.net/events',
			content_type: 'json'
		};

		console.log(webhookURL);

		let data = { active: false, config: configData };

		window
			.fetch(webhookURL, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
					Authorization: 'token ' + accessToken,
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((data) => {
				dispatch({ type: DELETE_WEBHOOK, payload: data });
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const turnOnNotifications = (webhookURL) => {
	return (dispatch) => {
		const accessToken = window.localStorage.getItem('token');

		let configData = {
			url: 'https://us-central1-guthubdashboard.cloudfunctions.net/events',
			content_type: 'json'
		};

		console.log(webhookURL);

		let data = { active: true, config: configData };

		window
			.fetch(webhookURL, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
					Authorization: 'token ' + accessToken,
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				dispatch({ type: DELETE_WEBHOOK, payload: data });
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
