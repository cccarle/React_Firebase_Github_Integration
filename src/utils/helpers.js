import firebase from '../config/firebase'
import { updateReposInOrgs, updateRepos } from './firebaseHelpers'
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

export const saveGithubIDToFireStore = (githubID) => {
  db.collection('users').doc(`${githubID}`).set({
    userID: githubID
  }, { merge: true })
}

export const currentLoggedInUserFirestoreReference = () => {

  return db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)
}
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

export const addWebhook = (repo) => {

  let githubParameters = { events: ['issues', 'push'], name: 'web', config: getConfigURL() }

  window
    .fetch(repo.hooks_url, {
      method: 'POST',
      body: JSON.stringify(githubParameters),
      headers: {
        Authorization: 'token ' + getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (repo.reposInOrgss) {
        updateReposInOrgs(repo, data)
      } else {
        updateRepos(repo, data)
      }
    })
    .catch((err) => {
      console.log('An error accoured when trying to add webhook : ' + err)
    })
}


export const deleteWebhook = (repo) => {
  console.log(repo)
  window
    .fetch(repo.hooksID, {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      if (repo.reposInOrgss === true) {
        let update = {}
        let reposInOrgs = {
          active: false,
          admin: repo.admin,
          avatarURL: repo.avatarURL,
          hooks_url: repo.hooks_url,
          id: repo.id,
          name: repo.name,
          owner: repo.owner,
          url: repo.url,
          hooksID: repo.url,
          reposInOrgss: true
        }

        update[`reposInOrgs.${repo.id}`] = reposInOrgs

        deleteSubscription(repo.id)

        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).update(update)

      } else {
        let obj = {
          active: false,
          admin: repo.admin,
          avatarURL: repo.avatarURL,
          hooks_url: repo.hooks_url,
          id: repo.id,
          name: repo.name,
          owner: repo.owner,
          url: repo.url,
          hooksID: repo.hooksID
        }

        let update = {}

        update[`repos.${repo.id}`] = obj

        deleteSubscription(repo.id)

        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).update(update)
      }
    })
}

export const deleteSubscription = (id) => {

  //   db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).update({
  //     ['subscriptions.' + id]: db.FieldValue.delete()
  // })
  console.log('delete repo')
}

