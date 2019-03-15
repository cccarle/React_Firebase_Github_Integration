import { GET_USER_PROFILE_DATA, GET_REPOS_DATA, GET_ORGS_DATA, GET_REPOS_IN_ORGS,GET_SUBSCRIPTIONS } from './types'
import { getGitHubToken, getCurrentLoggedInGithubID } from '../utils/helpers'
import firebase from '../config/firebase'

let db = firebase.firestore()

export const fetchUserDataFromGithubAPI = () => {
  return (dispatch) => {
    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + getGitHubToken() }
      })
      .then((response) => response.json())
      .then((githubUserProfileData) => {
        console.log(githubUserProfileData)
        dispatch({ type: GET_USER_PROFILE_DATA, payload: githubUserProfileData })
      })
  }
}

export const fetchOrgsDataGithubAPI = () => {
  let adminReposInOrg = []

  return (dispatch) => {
    var docRef = db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)

    docRef.onSnapshot(function (doc) {
      if (doc.exists && doc.data().orgs) {
        let changes = doc.data().orgs

        for (let key in changes) {
          adminReposInOrg.push(changes[key])
        }
      }

      dispatch({ type: GET_ORGS_DATA, payload: adminReposInOrg })
      adminReposInOrg = []
    })
  }
}

export const fetchReposDataGithubAPI = () => {
  var notificationsArray = []

  return (dispatch) => {
    var docRef = db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)

    docRef.onSnapshot(function (doc) {
      if (doc.exists && doc.data().repos) {
        let changes = doc.data().repos

        for (let key in changes) {
          notificationsArray.push(changes[key])
        }
      }

      dispatch({ type: GET_REPOS_DATA, payload: notificationsArray.filter(repo => repo.admin === true) })
      notificationsArray = []
    })
  }
}

export const fetchReposInOrg = (org) => {
  var reposInOrgsArray = []

  return (dispatch) => {
    var docRef = db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)

    docRef.onSnapshot(function (doc) {
      if (doc.exists && doc.data().reposInOrgs) {
        let changes = doc.data().reposInOrgs
        for (let key in changes) {
          if (changes[key].owner === org.name) {
            reposInOrgsArray.push(changes[key])
          }
        }
      }

      dispatch({ type: GET_REPOS_IN_ORGS, payload: reposInOrgsArray })
      reposInOrgsArray = []
    })
  }
}

export const fetchSubscriptions = () => {
  var subscriptionArray = []

  return (dispatch) => {
    var docRef = db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)

    docRef.onSnapshot(function (doc) {
      if (doc.exists && doc.data().subscriptions) {
        let changes = doc.data().subscriptions
        for (let key in changes) {
            subscriptionArray.push(changes[key])
        }
      }

      dispatch({ type: GET_SUBSCRIPTIONS, payload: subscriptionArray })
      subscriptionArray = []
    })
  }
}

