const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const firestore = admin.firestore()

/*
Webhook endpoint, store notification to firestore
Save repository to the user that created the webhook
*/

exports.events = functions.https.onRequest((req, res) => {

  const listOfAsyncJobs = [];

  if (req.body.zen) {
    listOfAsyncJobs.push(saveRepoIDToUser(req.body.sender.id, req.body.repository.id))
  }

  if (req.body.issue) {
    listOfAsyncJobs.push(createNotificationForIssue(req.body))
  }

  if (req.body.commits) {
    listOfAsyncJobs.push(createNotificationForComment(req.body))
  }

  return Promise.all(listOfAsyncJobs)
})

let saveRepoIDToUser = (userID, repoID) => {
  firestore.doc(`users/${userID}`).update({ repositoryID: admin.firestore.FieldValue.arrayUnion(repoID) })
}

let createNotificationForComment = (webhookData) => {

  let commit = {}
  commit.type = 'commit'
  commit.action = 'made commit'
  commit.body = webhookData.commits[0].message
  commit.commitURL = webhookData.commits[0].url
  commit.title = webhookData.commits[0].author.name.slice(1, -1)
  commit.repositoryID = webhookData.repository.id
  commit.repositoryName = webhookData.repository.name
  commit.avatarURL = webhookData.repository.owner.avatar_url
  commit.time = admin.firestore.FieldValue.serverTimestamp()

  admin.firestore().collection('notifications').add({ notification: commit })

}

let createNotificationForIssue = (webhookData) => {
  let issue = {}
  issue.type = 'issue'
  issue.action = webhookData.action
  issue.title = webhookData.issue.title
  issue.avatarURL = webhookData.issue.user.avatar_url
  issue.repositoryName = webhookData.repository.name
  issue.body = webhookData.issue.body
  issue.createdBy = webhookData.issue.user.login
  issue.id = webhookData.issue.id
  issue.eventURL = webhookData.issue.events_url
  issue.repositoryID = webhookData.repository.id
  issue.time = admin.firestore.FieldValue.serverTimestamp()

  admin.firestore().collection('notifications').add({ notification: issue })
}

/*
Send Notification to serivce worker
*/

exports.sendNotification = functions.firestore.document('notifications/{notification}').onCreate((snap, context) => {

  const newNotificationData = snap.data()

  // hämta new value, hämta repoID
  var repoID = newNotificationData.notification.repositoryID
  // hämta alla användare och deras reposID
  firestore
    .collection('users')
    .get()
    .then((querySnapshot) => {
      var users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      })

      return users
    })
    .then((users) => {
      users.forEach((element) => {
        let repositoryIDsArray = element.repositoryID
        var userID = element.userID

        repositoryIDsArray.forEach((repoIDss) => {
          if (repoIDss === repoID) {
            let payload = {}
            if (newNotificationData.notification.type === 'issue') {
              payload = {
                notification: {
                  type: newNotificationData.notification.type,
                  header: `${newNotificationData.notification.createdBy}  ${newNotificationData.notification.action} `,
                  body: `${newNotificationData.notification.body}`,
                  title: `${newNotificationData.notification.title} `,
                  avatar: `${newNotificationData.notification.avatarURL}`,
                  repositoryName: `${newNotificationData.notification.repositoryName}`,
                  repoID: `${newNotificationData.notification.repositoryID}`,
                  time: `${newNotificationData.notification.time}`
                }
              }
            } else {
              payload = {
                notification: {
                  type: newNotificationData.notification.type,
                  action: newNotificationData.notification.action,
                  body: newNotificationData.notification.body,
                  title: newNotificationData.notification.title,
                  avatar: `${newNotificationData.notification.avatarURL}`,
                  repositoryName: `${newNotificationData.notification.repositoryName}`,
                  repoID: `${newNotificationData.notification.repositoryID}`,
                  time: `${newNotificationData.notification.time}`
                }
              }
            }


            firestore.doc(`users/${userID}`).update({ notifications: admin.firestore.FieldValue.arrayUnion(payload) })
            return admin.messaging().sendToDevice(element.msgToken, payload)
          }
        })
      })
      return users
    })
    .catch((err) => {
      console.log('An error occurred when trying to send notificatin : ' + err)
    })

  return newNotificationData
})
