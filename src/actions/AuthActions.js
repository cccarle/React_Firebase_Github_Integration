import { LOGGED_IN_SUCCES, SIGN_OUT, GET_USER_PROFILE_DATA } from './types'
import firebase from '../config/firebase'
import Firebase from 'firebase'
import history from '../config/history'

export const checkIfUserIsLoggedIn = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch({ type: LOGGED_IN_SUCCES, payload: true })
        history.push('/dashboard')
      } else {
        dispatch({ type: SIGN_OUT, payload: false })
      }
    })
  }
}

export const signInUser = userData => {
  return dispatch => {
    let provider = new Firebase.auth.GithubAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        dispatch({ type: LOGGED_IN_SUCCES, payload: true })
        let accessToken = result.credential.accessToken

        window
          .fetch('https://api.github.com/user', {
            headers: { Authorization: 'token ' + accessToken }
          })
          .then(response => response.json())
          .then(data => {
            dispatch({ type: GET_USER_PROFILE_DATA, payload: data })

            history.push('/dashboard')
            console.log(data)
          })

        fetchUserDataFromGithubAPI(accessToken)
        fetchReposDataGithubAPI(accessToken)
      })
      .catch(function (error) {
        let { errorCode, errorMessage } = error
        console.log(
          `Something went wrong please check your credentials or try again. error message : ${errorMessage} - ${errorCode}`
        )
      })
  }
}

export const signOutUser = userData => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch({ type: SIGN_OUT, payload: false })
        console.log('sign out succesfull')
        history.push('/')
      })
      .catch(function (error) {
        console.log('error accurred' + error)
      })
  }
}

export const fetchUserDataFromGithubAPI = accessToken => {
  return dispatch => {
    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + accessToken }
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: GET_USER_PROFILE_DATA, payload: data })

        history.push('/dashboard')
        console.log(data)
      })
  }
}

export const fetchReposDataGithubAPI = accessToken => {
  window
    .fetch('https://api.github.com/user/repos', {
      headers: { Authorization: 'token ' + accessToken }
    })
    .then(response => response.json())
    .then(data => {
      history.push('/dashboard')

      console.log(data)
    })
}
