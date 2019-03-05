import { FETCH_NOTIFICATIONS, DELETE_NOTIFICATIONS } from './types'

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

export const deleteNotifications = () => {
  return dispatch => {
    db.collection('notifications')
      .doc('{notification}')
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
        dispatch({ type: DELETE_NOTIFICATIONS })
      })
      .catch(error => {
        console.error('Error removing document: ', error)
      })
  }
}
