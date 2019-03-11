import { FETCH_NOTIFICATIONS, DELETE_NOTIFICATIONS } from './types';
import firebase from '../config/firebase';
const messaging = firebase.messaging();
let db = firebase.firestore();

export const fetchNotifications = () => {
	var matchedNotificationWithUserArray = [];

	return (dispatch) => {
		messaging.onMessage((payload) => {
			console.log(payload);
			matchedNotificationWithUserArray.push(payload);
			dispatch({ type: FETCH_NOTIFICATIONS, payload: matchedNotificationWithUserArray });
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

// let repoIDFromUser;
// let notificationArray = [];
// var matchedNotificationWithUserArray = [];
// let currentUser = firebase.auth().currentUser;
// let userID = currentUser.providerData[0].uid;

// var docRef = db.doc(`users/${userID}`).get().then((doc) => {
// 	if (doc.exists) {
// 		repoIDFromUser = doc.data().repositoryID;
// 	}
// });

// // db.collection('notifications').get().then((querySnapshot) => {
// // 	querySnapshot.forEach((doc) => {
// // 		notificationArray.push(doc.data().notification);
// // 	});

// // 	// repoIDFromUser.forEach((repositoryID) => {
// // 	// 	notificationArray.filter(function(el) {
// // 	// 		if (el.repositoryID == repositoryID) {
// // 	// 			const repoObj = {
// // 	// 				title: el.title,
// // 	// 				body: el.body
// // 	// 			};

// // 	// 			matchedNotificationWithUserArray.push(repoObj);
// // 	// 		}
// // 	// 	});
// // 	// });

// // 	dispatch({ type: FETCH_NOTIFICATIONS, payload: matchedNotificationWithUserArray });
// // });
