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
