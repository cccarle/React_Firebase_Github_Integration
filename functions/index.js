const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const sgMail = require('@sendgrid/mail');
const firestore = admin.firestore();

exports.events = functions.https.onRequest((req, res) => {
	var webhookData = {};

	if (req.body.sender) {
		const userStatusFirestoreRef = firestore
			.doc(`users/${req.body.sender.id}`)
			.set({ repositoryID: req.body.repository.id }, { merge: true });
	}

	if (req.body.issue) {
		webhookData.title = req.body.issue.title;
		webhookData.body = req.body.issue.body;
		webhookData.createdBy = req.body.issue.user.login;
		webhookData.id = req.body.issue.id;
		webhookData.userID = req.body.issue.user.id;
		webhookData.eventURL = req.body.issue.events_url;
		webhookData.repositoryID = req.body.repository.id;
	} else {
		webhookData.message = req.body.commits[0].message;
		webhookData.commitURL = req.body.commits[0].url;
		webhookData.commiter = req.body.commits[0].author;
	}

	// console.log(req.body)

	// Push the new commit/issue into the Cloud Firestore
	return admin.firestore().collection('notifications').add({ notification: webhookData }).then((writeResult) => {
		console.log(writeResult);
		return res.send(200);
		//return userStatusFirestoreRef.set({ repo_nodeID: webhookData.repository.node_id }, { merge: true })
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

// Send Notrification
exports.sendNotification = functions.firestore.document('notifications/{notification}').onCreate((snap, context) => {
	const newValue = snap.data();

	console.log(newValue);
	// sgMail.setApiKey(
	//   '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'
	// )
	// const msg = {
	//   to: 'ce222qw@student.lnu.se',
	//   from: 'test@example.com',
	//   subject: 'This is a notification from githubdashboard',
	//   text: JSON.stringify(newValue),
	//   html: JSON.stringify(newValue)
	// }
	// sgMail.send(msg)
});

// Check if logged in
exports.onUserStatusChanged = functions.database.ref('/users/{uid}').onUpdate((change, context) => {
	const eventStatus = change.after.val();

	const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`);

	return change.after.ref.once('value').then((statusSnapshot) => {
		const status = statusSnapshot.val();

		console.log(eventStatus);

		if (status.last_changed > eventStatus.last_changed) {
			return null;
		}

		eventStatus.last_changed = new Date(eventStatus.last_changed);

		return userStatusFirestoreRef.set({ eventStatus }, { merge: true });
	});
});
