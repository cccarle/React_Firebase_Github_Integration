import firebase from '../config/firebase'
let db = firebase.firestore()
let messaging = firebase.messaging()

export const getCurrentLoggedInUserID = () => {
  let user = firebase.auth().currentUser
  return user.uid
}

export const getCurrentLoggedInGithubID = () => {
  let user = firebase.auth().currentUser
  return user.providerData[0].uid
}

export const allowNotifications = () => {
  messaging
    .requestPermission()
    .then(() => {
      console.log('have permission')
      return messaging.getToken()
    })
    .then((token) => {
      let userID = getCurrentLoggedInGithubID()

      let userRef = db.collection('users').doc(userID)

      let setWithMerge = userRef.set(
        {
          msgToken: token
        },
        { merge: true }
      )
    })
    .catch((err) => {
      console.log(err)
    })
}

export const setGitHubToken = (accessToken) => {
  window.localStorage.setItem('token', accessToken)
}
export const getGitHubToken = () => {
  const accessToken = window.localStorage.getItem('token')
  return accessToken
}

export const getConfigURL = () => {
  let config = {
    url: `https://us-central1-guthubdashboard.cloudfunctions.net/events?id=${getCurrentLoggedInUserID()}`,
    content_type: 'json'
  }

  return config
}
