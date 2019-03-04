import { LOGGED_IN_SUCCES, SIGN_OUT } from './types'
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

    provider.addScope('admin:repo_hook')

    console.log(provider.dc)
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        dispatch({ type: LOGGED_IN_SUCCES, payload: true })
        let accessToken = result.credential.accessToken

        window.localStorage.setItem('token', accessToken)
        history.push('/dashboard')
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
