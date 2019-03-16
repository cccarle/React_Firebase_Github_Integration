const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const firestore = admin.firestore()

/*
Webhook endpoint, store notification to firestore
Save repository to the user that created the webhook
*/

exports.events = functions.https.onRequest((req, res) => {
  var webhookData = {}
  if (req.body.zen) {
    const userStatusFirestoreRef = firestore.doc(`users/${req.body.sender.id}`)

    var arrUnion = userStatusFirestoreRef.update({
      repositoryID: admin.firestore.FieldValue.arrayUnion(req.body.repository.id)
    })
  }

  webhookData.time = admin.firestore.FieldValue.serverTimestamp()

  if (req.body.issue) {
    webhookData.type = 'issue'
    webhookData.action = req.body.action
    webhookData.title = req.body.issue.title
    webhookData.avatarURL = req.body.issue.user.avatar_url
    webhookData.repositoryName = req.body.repository.name
    webhookData.body = req.body.issue.body
    webhookData.createdBy = req.body.issue.user.login
    webhookData.id = req.body.issue.id
    webhookData.eventURL = req.body.issue.events_url
    webhookData.repositoryID = req.body.repository.id
  }

  if (req.body.commits) {
    webhookData.type = 'commit'
    webhookData.action = 'made commit'
    webhookData.body = req.body.commits[0].message
    webhookData.commitURL = req.body.commits[0].url
    webhookData.title = req.body.commits[0].author.name.slice(1, -1)
    webhookData.repositoryID = req.body.repository.id
    webhookData.repositoryName = req.body.repository.name
    webhookData.avatarURL = req.body.repository.owner.avatar_url
  }

  return admin.firestore().collection('notifications').add({ notification: webhookData }).then((writeResult) => {
    return res.send(200)
  })
})

/*
Send Notification to serivce worker
*/

exports.sendNotification = functions.firestore.document('notifications/{notification}').onCreate((snap, context) => {
  const newValue = snap.data()

  // hämta new value, hämta repoID
  var repoID = newValue.notification.repositoryID
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
            if (newValue.notification.type === 'issue') {
              payload = {
                notification: {
                  type: newValue.notification.type,
                  header: `${newValue.notification.createdBy}  ${newValue.notification.action} `,
                  body: `${newValue.notification.body}`,
                  title: `${newValue.notification.title} `,
                  avatar: `${newValue.notification.avatarURL}`,
                  repositoryName: `${newValue.notification.repositoryName}`,
                  repoID: `${newValue.notification.repositoryID}`,
                  time: `${newValue.notification.time}`
                }
              }
            } else {
              payload = {
                notification: {
                  type: newValue.notification.type,
                  action: newValue.notification.action,
                  body: newValue.notification.body,
                  title: newValue.notification.title,
                  avatar: `${newValue.notification.avatarURL}`,
                  repositoryName: `${newValue.notification.repositoryName}`,
                  repoID: `${newValue.notification.repositoryID}`,
                  time: `${newValue.notification.time}`
                }
              }
            }


            const userStatusFirestoreRef = firestore.doc(`users/${userID}`)

            var arrUnion = userStatusFirestoreRef.update({
              notifications: admin.firestore.FieldValue.arrayUnion(payload)
            })
            return admin.messaging().sendToDevice(element.msgToken, payload)
          }
        })
      })
      return users
    })
    .catch((err) => {
      console.log('An error occurred when trying to send notificatin : ' + err)
    })

  return newValue
})
