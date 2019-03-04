const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

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
