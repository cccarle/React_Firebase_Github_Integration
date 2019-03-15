import * as Firebase from 'firebase'
import { LOGGED_IN_SUCCES, SIGN_OUT } from './types'
import { setGitHubToken, saveGithubIDToFireStore } from '../utils/helpers'
import firebase from '../config/firebase'
import history from '../config/history'

export const checkIfUserIsLoggedIn = () => dispatch => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.localStorage.setItem('loggedInUser', user.providerData[0].uid)
      saveGithubIDToFireStore(user.providerData[0].uid)
      dispatch({ type: LOGGED_IN_SUCCES, payload: true })
      history.push('/dashboard')
    } else {
      dispatch({ type: SIGN_OUT, payload: false })
    }
  })
}

export const signInUser = userData => dispatch => {
  const provider = new Firebase.auth.GithubAuthProvider()

  provider.addScope('user')
  provider.addScope('repo')

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const { accessToken } = result.credential
      setGitHubToken(accessToken)
      dispatch({ type: LOGGED_IN_SUCCES, payload: true })
      history.push('/dashboard')
    })
    .catch(function (error) {
      const { errorCode, errorMessage } = error
      console.log(
        `Something went wrong please check your credentials or try again. error message : ${errorMessage} - ${errorCode}`
      )
    })
}

export const signOutUser = userData => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: SIGN_OUT, payload: false })
      history.push('/')
    })
    .catch(function (error) {
      console.log(`error accurred${error}`)
    })
}
