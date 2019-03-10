const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const sgMail = require('@sendgrid/mail');
const firestore = admin.firestore();

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

// Send Notrification
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
					sgMail.setApiKey('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');
					const msg = {
						to: `${element.email}`,
						from: 'test@example.com',
						subject: 'This is a notification from githubdashboard',
						text: JSON.stringify(newValue),
						html: JSON.stringify(newValue)
					};
					sgMail.send(msg);
				}
			});
			return users;
		})
		.catch((err) => {
			console.log(err);
		});

	// alla användare som hare reopoID och har eventStatus.state == offline
	// Skicka notification

	let msg = 'everything went fine';

	return msg;
});

// Check if logged in
exports.onUserStatusChanged = functions.database.ref('/users/{uid}').onUpdate((change, context) => {
	const eventStatus = change.after.val();

	const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`);

	return change.after.ref.once('value').then((statusSnapshot) => {
		const status = statusSnapshot.val();

		if (status.last_changed > eventStatus.last_changed) {
			return null;
		}

		eventStatus.last_changed = new Date(eventStatus.last_changed);

		return userStatusFirestoreRef.set({ eventStatus }, { merge: true });
	});
});

// Add message
// exports.addMessage = functions.https.onCall((data, context) => {
//   const text = data.text
//   const uid = context.auth.uid
//   const name = context.auth.token.name || null

//   const email = context.auth.token.email || null
//   console.log('body: ' + text + 'uid: ' + uid + 'name :' + name + 'email :' + email)
// })
