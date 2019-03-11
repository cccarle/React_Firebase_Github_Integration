importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

//import * as firebase from 'firebase'

const config = {
	apiKey: 'AIzaSyBr2zjlkIdRl2TwTN2OOsA85AW8NeHBI2k',
	authDomain: 'guthubdashboard.firebaseapp.com',
	databaseURL: 'https://guthubdashboard.firebaseio.com',
	projectId: 'guthubdashboard',
	storageBucket: 'guthubdashboard.appspot.com',
	messagingSenderId: '259327836521'
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    const title = 'hello worl'
    const options = {
		body: payload.data.body,
		title: payload.data.title
    }
	return self.registration.showNotification(title, options);
});
