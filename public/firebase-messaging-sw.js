importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

const config = {
  apiKey: 'AIzaSyBr2zjlkIdRl2TwTN2OOsA85AW8NeHBI2k',
  authDomain: 'guthubdashboard.firebaseapp.com',
  databaseURL: 'https://guthubdashboard.firebaseio.com',
  projectId: 'guthubdashboard',
  storageBucket: 'guthubdashboard.appspot.com',
  messagingSenderId: '259327836521'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((payload) => {
  const options = {
    body: payload.notification.title,
    title: payload.notification.title,
    createdBy: payload.notification.createdBy
  }

  return self.registration.showNotification(title, options)
})
