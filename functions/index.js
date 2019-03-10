const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

/* 
Webhook endpoint, store notification to firestore
Save repository to the user that created the webhook
*/

exports.events = functions.https.onRequest((req, res) => {
	var webhookData = {};

	if (req.body.zen) {
		const userStatusFirestoreRef = firestore.doc(`users/${req.body.sender.id}`);

		var arrUnion = userStatusFirestoreRef.update({
			repositoryID: admin.firestore.FieldValue.arrayUnion(req.body.repository.id)
		});
	}

	if (req.body.issue) {
		webhookData.title = req.body.issue.title;
		webhookData.body = req.body.issue.body;
		webhookData.createdBy = req.body.issue.user.login;
		webhookData.id = req.body.issue.id;
		webhookData.eventURL = req.body.issue.events_url;
		webhookData.repositoryID = req.body.repository.id;
	} else {
		webhookData.message = req.body.commits[0].message;
		webhookData.commitURL = req.body.commits[0].url;
		webhookData.commiter = req.body.commits[0].author;
	}

	return admin.firestore().collection('notifications').add({ notification: webhookData }).then((writeResult) => {
		console.log(writeResult);
		return res.send(200);
	});
});

/* 
Send Notification to serivce worker
*/

exports.sendNotification = functions.firestore.document('notifications/{notification}').onCreate((snap, context) => {
	const newValue = snap.data();

	// hämta new value, hämta repoID
	var repoID = newValue.notification.repositoryID;
	// hämta alla användare och deras reposID
	firestore
		.collection('users')
		.get()
		.then((querySnapshot) => {
			var users = [];
			querySnapshot.forEach((doc) => {
				users.push(doc.data());
			});

			return users;
		})
		.then((users) => {
			users.forEach((element) => {
				if (element.repositoryID[0] === repoID && element.eventStatus.state === 'offline') {
					const payload = {
						notification: {
							title: `${newValue.notification.title}`,
							body: `${newValue.notification.body}`
						}
					};

					return admin.messaging().sendToDevice(element.msgToken, payload);
				}
			});
			return users;
		})
		.catch((err) => {
			console.log(err);
		});

	let msg = 'everything went fine';

	return msg;
});
