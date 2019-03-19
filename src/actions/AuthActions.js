import * as Firebase from 'firebase'
import { LOGGED_IN_SUCCES, SIGN_OUT } from './types'
import { setGitHubToken, saveGithubIDToFireStore } from '../utils/helpers'
import firebase from '../config/firebase'
import history from '../config/history'

/*
Check if user is logged in, if a user exist display dashboard else loginpage
*/

export const checkIfUserIsLoggedIn = () => dispatch => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch({ type: LOGGED_IN_SUCCES, payload: true })
      history.push('/dashboard')
    } else {
      dispatch({ type: SIGN_OUT, payload: false })
    }
  })
}

/*
Sign in a user with firebase Oauth
Opens popup window, if success token will be retrived
*/

export const signInUser = userData => dispatch => {
  const provider = new Firebase.auth.GithubAuthProvider()

  provider.addScope('user')
  provider.addScope('repo')

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const { accessToken } = result.credential
      window.localStorage.setItem('loggedInUser', result.user.providerData[0].uid)
      saveGithubIDToFireStore()
      
      return accessToken
    }).then((accessToken) => {
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

/*
Sign out user and display loginpage
*/

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
