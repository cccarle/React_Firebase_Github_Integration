import { GET_USER_PROFILE_DATA, GET_REPOS_DATA, GET_ORGS_DATA, GET_REPOS_IN_ORGS, GET_SUBSCRIPTIONS } from './types'
import { getGitHubToken, currentLoggedInUserFirestoreReference } from '../utils/helpers'

/* 
Retrieve github repositories from authenticated user and saves it as objects to firestore under field "repos"
*/

export const fetchUserDataFromGithubAPI = () => {
  return async (dispatch) => {
    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + await getGitHubToken() }
      })
      .then((response) => response.json())
      .then((githubUserProfileData) => {
        dispatch({ type: GET_USER_PROFILE_DATA, payload: githubUserProfileData })
      })
  }
}

/* 
  Fetches all organizations in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchOrgsDataGithubAPI = () => {
  let adminReposInOrg = []

  return (dispatch) => {

    currentLoggedInUserFirestoreReference().onSnapshot(function (doc) {
      if (doc.exists && doc.data().orgs) {
        let org = doc.data().orgs
        for (let key in org) {
          adminReposInOrg.push(org[key])
        }
      }

      dispatch({ type: GET_ORGS_DATA, payload: adminReposInOrg })
      adminReposInOrg = []
    })
  }
}

/* 
  Fetches all repositories in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchReposDataGithubAPI = () => {
  let reposArray = []

  return (dispatch) => {
    currentLoggedInUserFirestoreReference().onSnapshot(function (doc) {
      if (doc.exists && doc.data().repos) {

        let repo = doc.data().repos

        for (let key in repo) {
          reposArray.push(repo[key])
        }
      }

      dispatch({ type: GET_REPOS_DATA, payload: reposArray.filter(repo => repo.admin === true) })
      reposArray = []
    })
  }
}

/* 
  Fetches all repositories in organizations in realtime from the authenticated users firestore & update the state with the new data
*/

export const fetchReposInOrg = (org) => {
  let reposInOrgsArray = []

  return (dispatch) => {
    currentLoggedInUserFirestoreReference().onSnapshot(function (doc) {
      if (doc.exists && doc.data().reposInOrgs) {
        let repo = doc.data().reposInOrgs
        for (let key in repo) {
          if (repo[key].owner === org.name) {
            reposInOrgsArray.push(repo[key])
          }
        }
      }

      dispatch({ type: GET_REPOS_IN_ORGS, payload: reposInOrgsArray })
      reposInOrgsArray = []
    })
  }
}

/* 
  Fetches all subscription in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchSubscriptions = () => {
  let subscriptionArray = []

  return (dispatch) => {
    currentLoggedInUserFirestoreReference().onSnapshot(function (doc) {
      if (doc.exists && doc.data().subscriptions) {
        let subscription = doc.data().subscriptions
        for (let key in subscription) {
          subscriptionArray.push(subscription[key])
        }
      }

      dispatch({ type: GET_SUBSCRIPTIONS, payload: subscriptionArray })
      subscriptionArray = []
    })
  }
}

