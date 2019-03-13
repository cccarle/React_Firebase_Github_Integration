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
  let id = req.query.id
  if (req.body.zen) {
    const userStatusFirestoreRef = firestore.doc(`users/${req.body.sender.id}`)

    var arrUnion = userStatusFirestoreRef.update({
      repositoryID: admin.firestore.FieldValue.arrayUnion(req.body.repository.id)
    })
  }

  if (req.body.issue) {
    webhookData.title = req.body.issue.title
    webhookData.body = req.body.issue.body
    webhookData.createdBy = req.body.issue.user.login
    webhookData.id = req.body.issue.id
    webhookData.eventURL = req.body.issue.events_url
    webhookData.repositoryID = req.body.repository.id
  } else {
    webhookData.body = req.body.commits[0].message
    webhookData.commitURL = req.body.commits[0].url
    webhookData.title = req.body.commits[0].author.name.slice(1, -1)
    webhookData.repositoryID = req.body.repository.id
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

        repositoryIDsArray.forEach((repoIDss) => {
          if (repoIDss === repoID) {
            const payload = {
              notification: {
                title: `${newValue.notification.title}`,
                body: `${newValue.notification.body}`,
                createdBy: `${newValue.notification.createdBy}`
              }
            }

            return admin.messaging().sendToDevice(element.msgToken, payload)
          }
        })
      })
      return users
    })
    .catch((err) => {
      console.log(err)
    })

  return newValue
})
