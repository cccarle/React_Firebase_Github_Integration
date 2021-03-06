import firebase from '../config/firebase'
import { updateReposInOrgs, updateRepos, addToMySubscription } from './firebaseDB'
let db = firebase.firestore()
let messaging = firebase.messaging()

/*
Retrieve firebaseID from logged in user.
*/

export const getCurrentLoggedInUserID = () => {
  let user = firebase.auth().currentUser
  return user.uid
}

/*
Retrieve githubID from logged in user.
*/

export const getCurrentLoggedInGithubID = () => {
  let id = window.localStorage.getItem('loggedInUser')
  return id
}

/*
Saves GithubID of logged in user to firestore
*/

export const saveGithubIDToFireStore = async () => {
  let id = await window.localStorage.getItem('loggedInUser')
  currentLoggedInUserFirestoreReference().set({
    userID: id
  }, { merge: true })
}

/*
Returns a "query" to the current users data from Firestore
*/

export const currentLoggedInUserFirestoreReference = () => {
  return db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)
}

/*
Ask for permission to send notifications.
If accepted, store nsgToken to the users firestore collection.
msgToken will be used to send notification when a user if offline.
*/

export const allowNotifications = () => {
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken()
    })
    .then((token) => {
      currentLoggedInUserFirestoreReference().set({ msgToken: token }, { merge: true })
    })
    .catch((err) => {
      console.log('An error accured : ' + err)
    })
}

/*
Save githuvToken to the users Firestore collection.
accesToken will be used to fetch data from the github API
*/

export const setGitHubToken = async (accessToken) => {
  return currentLoggedInUserFirestoreReference().set({
    accessToken: accessToken
  }, { merge: true })
}

/*
Returns a "query" to the current users data from Firestore for getting the accesToken
*/

export const getGitHubToken = async () => {

  let token = await currentLoggedInUserFirestoreReference().get().then(function (doc) {
    if (doc.exists) {
      return doc.data().accessToken
    }
  }).catch(function (error) {
    console.log(`Something went wrong ` + error)
  })

  return token
}

/*
Returns an object with config settings for creating a hook
*/

export const getConfigURL = () => {
  let config = {
    url: `https://us-central1-guthubdashboard.cloudfunctions.net/events?id=${getCurrentLoggedInUserID()}`,
    content_type: 'json'
  }
  return config
}

/*
POST to Github API, attempt to add a webhook to a repository.
Update firestore with repo that the webhook has been created  to with a "activeStatus" set to true.
activeStatus controll the buttons status of the "Components/RepoList".
*/

export const addWebhook = async (repo) => {
  let githubParameters = { events: ['issues', 'push'], name: 'web', config: getConfigURL() }

  window
    .fetch(repo.hooks_url, {
      method: 'POST',
      body: JSON.stringify(githubParameters),
      headers: {
        Authorization: 'token ' + await getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      let activeStatus = true

      if (repo.reposInOrgss) {
        updateReposInOrgs(repo, data, activeStatus)
      } else {
        updateRepos(repo, data, activeStatus)
      }

      addToMySubscription(repo, data, activeStatus)
    })
    .catch((err) => {
      console.log('An error accoured when trying to add webhook : ' + err)
    })
}

/*
DELETE to Github API, attempt to delete a webhook from a repository.
Update firestore with repo that the webhook has been removed from, from "activeStatus" true tpo false.
activeStatus controll the buttons status of the "Components/RepoList".
*/

export const deleteWebhook = async (repo) => {
  window
    .fetch(repo.hooksID, {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + await getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      let activeStatus = false

      if (repo.reposInOrgss) {
        updateReposInOrgs(repo, null, activeStatus)
      } else {
        updateRepos(repo, null, activeStatus)
      }
    }).catch((err) => {
      console.log('An error accoured when trying to delete webhook : ' + err)
    })
}
