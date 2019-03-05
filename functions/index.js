const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const sgMail = require('@sendgrid/mail')

exports.events = functions.https.onRequest((req, res) => {
  var webhookData = {}
  if (req.body.issue) {
    webhookData.title = req.body.issue.title
    webhookData.body = req.body.issue.body
    webhookData.createdBy = req.body.issue.user.login
    webhookData.eventURL = req.body.issue.events_url
  } else {
    webhookData.message = req.body.commits[0].message
    webhookData.commitURL = req.body.commits[0].url
    webhookData.commiter = req.body.commits[0].author
  }

  // Push the new commit/issue into the Cloud Firestore
  return admin
    .firestore()
    .collection('notifications')
    .add({ notification: webhookData })
    .then(writeResult => {
      // Send back a message that we've successfully written the message
      return res.json({ result: `Message with ID: ${writeResult} added.` })
    })
})

exports.sendNotification = functions.firestore
  .document('notifications/{notification}')
  .onCreate((snap, context) => {
    const newValue = snap.data()

    sgMail.setApiKey(
      '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'
    )
    const msg = {
      to: 'ce222qw@student.lnu.se',
      from: 'test@example.com',
      subject: 'This is a notification from githubdashboard',
      text: JSON.stringify(newValue),
      html: JSON.stringify(newValue)
    }
    sgMail.send(msg)

    console.log(newValue)
  })

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore()

// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database
  .ref('/status/{uid}')
  .onUpdate((change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val()

    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`)

    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    return change.after.ref.once('value').then(statusSnapshot => {
      const status = statusSnapshot.val()
      console.log(status, eventStatus)
      // If the current timestamp for this data is newer than
      // the data that triggered this event, we exit this function.
      if (status.last_changed > eventStatus.last_changed) {
        return null
      }

      // Otherwise, we convert the last_changed field to a Date
      eventStatus.last_changed = new Date(eventStatus.last_changed)

      // ... and write it to Firestore.
      return userStatusFirestoreRef.set(eventStatus)
    })
  })








  // exports.sendNotification = functions.firestore
  // .document('notifications/{notification}')
  // .onCreate((snap, context) => {
  //   const newValue = snap.data()

  //   sgMail.setApiKey(
  //     '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'
  //   )
  //   const msg = {
  //     to: 'ce222qw@student.lnu.se',
  //     from: 'test@example.com',
  //     subject: 'This is a notification from githubdashboard',
  //     text: JSON.stringify(newValue),
  //     html: JSON.stringify(newValue)
  //   }
  //   sgMail.send(msg)

  //   console.log(newValue)
  // })