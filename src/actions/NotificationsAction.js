import { FETCH_NOTIFICATIONS, DELETE_NOTIFICATIONS } from './types';
import firebase from '../config/firebase';
let db = firebase.firestore();

export const fetchNotifications = () => {
	return (dispatch) => {
		let repoIDFromUser;
		let notificationArray = [];
		let currentUser = firebase.auth().currentUser;
		let userID = currentUser.providerData[0].uid;

		var docRef = db.collection('users').doc(`${userID}`);

		docRef
			.get()
			.then(function(doc) {
				if (doc.exists) {
					repoIDFromUser = doc.data().repositoryID.toString();
				}
			})
			.catch(function(error) {
				console.log('Error getting document:', error);
			});

		db.collection('notifications').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let notification = {
					title: `${doc.data().notification.title}`,
					body: `${doc.data().notification.body}`,
					createdby: `${doc.data().notification.createdBy}`,
					eventURL: `${doc.data().notification.eventURL}`,
					repositoryID: `${doc.data().notification.repositoryID}`
				};

				notificationArray.push(notification);
			});

			let filteredNotificationArray = notificationArray.filter((child) => child.repositoryID === repoIDFromUser);

			dispatch({ type: FETCH_NOTIFICATIONS, payload: filteredNotificationArray });
		});
	};
};

export const deleteNotifications = () => {
	return (dispatch) => {
		db
			.collection('notifications')
			.doc('{notification}')
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
				dispatch({ type: DELETE_NOTIFICATIONS });
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};
};
