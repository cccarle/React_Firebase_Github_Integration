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

/*
Save the RepoID from the wehhook to the users firestore
*/

let saveRepoIDToUser = (userID, repoID) => {
  firestore.doc(`users/${userID}`).update({ repositoryID: admin.firestore.FieldValue.arrayUnion(repoID) })
}


/*
Create a notification object for comments and store it to notifications collection
*/

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


/*
Create a notification object for issues and store it to notifications collection
*/

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

  let newNotificationData = snap.data()
  let repoID = newNotificationData.notification.repositoryID
  let listOfAsyncJobs = []

  firestore.collection('users').get().then((querySnapshot) => {

    let users = []
    querySnapshot.forEach((doc) => {
      users.push(doc.data())
    })

    return users
  }).then((users) => {

    users.forEach((element) => {

      let usersRepositoriesIDS = element.repositoryID
      let userID = element.userID
      let msgToken = element.msgToken

      usersRepositoriesIDS.forEach((repoIDss) => {
        if (repoIDss === repoID) {

          if (newNotificationData.notification.type === 'issue') {
            listOfAsyncJobs.push(createMessagePayloadForIssue(newNotificationData.notification, userID, msgToken))
          } else {
            listOfAsyncJobs.push(createMessagePayloadForComment(newNotificationData.notification, userID, msgToken))
          }
        }
      })
    })
    return users
  })
    .catch((err) => {
      console.log('An error occurred when trying to send notificatin : ' + err)
    })

  return Promise.all(listOfAsyncJobs)
})

/*
Create a payload from comment data, and send it to the service worker
*/

let createMessagePayloadForComment = (notificationData, userID, msgToken) => {
  let payloadForComment = {
    notification: {
      type: notificationData.type,
      action: notificationData.action,
      body: notificationData.body,
      title: notificationData.title,
      avatar: `${notificationData.avatarURL}`,
      repositoryName: `${notificationData.repositoryName}`,
      repoID: `${notificationData.repositoryID}`,
      time: `${notificationData.time}`
    }
  }

  firestore.collection('users').doc(`${userID}`).collection('notifications').add({
    type: notificationData.type,
    action: notificationData.action,
    body: notificationData.body,
    title: notificationData.title,
    avatar: `${notificationData.avatarURL}`,
    repositoryName: `${notificationData.repositoryName}`,
    repoID: `${notificationData.repositoryID}`,
    time: `${notificationData.time}`
  })

  admin.messaging().sendToDevice(msgToken, payloadForComment)
}

/*
Create a payload from issue data, and send it to the service worker
*/

let createMessagePayloadForIssue = (notificationData, userID, msgToken) => {

  let update = {}

  let payloadForIssue = {
    notification: {
      type: notificationData.type,
      header: `${notificationData.createdBy}  ${notificationData.action} `,
      body: `${notificationData.body}`,
      title: `${notificationData.title} `,
      avatar: `${notificationData.avatarURL}`,
      repositoryName: `${notificationData.repositoryName}`,
      repoID: `${notificationData.repositoryID}`,
      time: `${notificationData.time}`
    }
  }



  firestore.collection('users').doc(`${userID}`).collection('notifications').add({
    type: notificationData.type,
    header: `${notificationData.createdBy}  ${notificationData.action} `,
    body: `${notificationData.body}`,
    title: `${notificationData.title} `,
    avatar: `${notificationData.avatarURL}`,
    repositoryName: `${notificationData.repositoryName}`,
    repoID: `${notificationData.repositoryID}`,
    time: `${notificationData.time}`
  })

  admin.messaging().sendToDevice(msgToken, payloadForIssue)
}