const functions = require('firebase-functions')
const admin = require('firebase-admon')

admin.initializeApp(functions.config().firebase)


exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

exports.auth = functions.auth.user()
.onCreate(user => { 
    
})