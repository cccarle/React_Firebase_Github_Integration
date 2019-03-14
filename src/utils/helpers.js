import firebase from '../config/firebase'
let db = firebase.firestore()
let messaging = firebase.messaging()

export const getCurrentLoggedInUserID = () => {
  let user = firebase.auth().currentUser
  return user.uid
}

export const getCurrentLoggedInGithubID = () => {
  let id = window.localStorage.getItem('loggedInUser')
  return id
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

export const checkIfRepoHasHook = (hooksURL) => {
  return window
    .fetch(hooksURL, {
      headers: { Authorization: 'token ' + getGitHubToken() }
    })
    .then((response) => response.json())
    .then((hooks) => {
      if (Array.isArray(hooks)) {
        if (hooks[0] !== undefined && hooks[0].config.url === getConfigURL().url) {
          let obj = {
            url: hooks[0].url,
            active: true
          }
          return obj
        } else {
          let obj = {
            active: false
          }
          return obj
        }
      }
    })
}

export const addWebhook = (webhookURL) => {
  let githubParameters = { events: ['issues', 'push'], name: 'web', config: getConfigURL() }

  window
    .fetch(webhookURL, {
      method: 'POST',
      body: JSON.stringify(githubParameters),
      headers: {
        Authorization: 'token ' + getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
}
