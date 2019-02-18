import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBr2zjlkIdRl2TwTN2OOsA85AW8NeHBI2k',
  authDomain: 'guthubdashboard.firebaseapp.com',
  databaseURL: 'https://guthubdashboard.firebaseio.com',
  projectId: 'guthubdashboard',
  storageBucket: 'guthubdashboard.appspot.com',
  messagingSenderId: '259327836521'
}

export default firebase.initializeApp(config)
