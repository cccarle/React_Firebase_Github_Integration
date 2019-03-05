import { FETCH_NOTIFICATIONS } from './types'

import firebase from '../config/firebase'
var db = firebase.firestore()

export const fetchNotifications = () => {
  return dispatch => {
    let notificationArray = []
    db.collection('notifications')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let notification = {
            title: `${doc.data().notification.title}`,
            body: `${doc.data().notification.body}`,
            createdby: `${doc.data().notification.createdBy}`,
            eventURL: `${doc.data().notification.eventURL}`
          }

          notificationArray.push(notification)
        })
        dispatch({ type: FETCH_NOTIFICATIONS, payload: notificationArray })
      })
  }
}
