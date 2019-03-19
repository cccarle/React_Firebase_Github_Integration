import { FETCH_NOTIFICATIONS, FETCH_NOTIFICATIONS_LENGTH } from './types'
import { currentLoggedInUserFirestoreReference } from '../utils/helpers'

/*
  Fetches all notifications in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchNotifications = () => {
  var notificationsArray = []
  return async (dispatch) => {
    currentLoggedInUserFirestoreReference().collection('notifications').onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let notification = doc.data()

        let notificationObject = {}

        if (notification.type === 'issue') {
          notificationObject.title = notification.title
          notificationObject.body = notification.body
          notificationObject.createdBy = notification.header + notification.type
          notificationObject.avatar = notification.avatar
          notificationObject.repositoryName = notification.repositoryName
          notificationObject.time = notification.time
          notificationObject.repoID = notification.repoID
          notificationObject.staus = notification.staus
        } else {
          notificationObject.title = notification.type
          notificationObject.body = notification.body
          notificationObject.createdBy = notification.title + ' ' + notification.action
          notificationObject.avatar = notification.avatar
          notificationObject.repositoryName = notification.repositoryName
          notificationObject.time = notification.time
          notificationObject.staus = notification.staus
        }

        notificationsArray.push(notificationObject)

        let latestNotifications = notificationsArray.filter(child => child.staus !== true)

        dispatch({ type: FETCH_NOTIFICATIONS_LENGTH, payload: latestNotifications.reverse() })
      })

      dispatch({ type: FETCH_NOTIFICATIONS, payload: notificationsArray })

      notificationsArray = []
    })
  }
}

/*
Update the state of notification to an empty array.
Clears the notification counter
*/

export const clearNotification = () => {
  return (dispatch) => {
    let notificationsArray = []
    dispatch({ type: FETCH_NOTIFICATIONS_LENGTH, payload: notificationsArray.reverse() })
  }
}
