import { FETCH_NOTIFICATIONS, TEST_DISPATCH } from './types'
import { getCurrentLoggedInGithubID } from '../utils/helpers'
import firebase from '../config/firebase'
import { FieldValue } from '@google-cloud/firestore'
const messaging = firebase.messaging()
let db = firebase.firestore()

export const fetchNotifications = () => {
  var notificationsArray = []
  return (dispatch) => {
    var docRef = db.collection('users').doc(`${getCurrentLoggedInGithubID()}`)

    docRef.onSnapshot(function (doc) {

      if (doc.exists && doc.data().notifications) {
        let changes = doc.data().notifications
        changes.forEach(change => {
          console.log(change)
          let obj = {}
          obj.title = change.notification.title
          obj.body = change.notification.body
          obj.createdBy = change.notification.header
          obj.avatar = change.notification.avatar
          obj.repositoryName = change.notification.repositoryName

          notificationsArray.push(obj)
        })
      }

      let reversed = notificationsArray.reverse()

      dispatch({ type: FETCH_NOTIFICATIONS, payload: reversed })
      notificationsArray = []
    })
  }
}

export const clearNotifications = () => {

}

