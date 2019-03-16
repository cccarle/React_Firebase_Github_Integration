import { FETCH_NOTIFICATIONS } from './types'
import { currentLoggedInUserFirestoreReference } from '../utils/helpers'

/* 
  Fetches all notifications in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchNotifications = () => {
  var notificationsArray = []
  return async (dispatch) => {

    await currentLoggedInUserFirestoreReference().onSnapshot(function (doc) {
      if (doc.exists && doc.data().notifications) {
        let notifications = doc.data().notifications
        notifications.forEach(notification => {
          let notificationObject = {}
          if (notification.notification.type === 'issue') {
            notificationObject.title = notification.notification.title
            notificationObject.body = notification.notification.body
            notificationObject.createdBy = notification.notification.header + notification.notification.type
            notificationObject.avatar = notification.notification.avatar
            notificationObject.repositoryName = notification.notification.repositoryName
            notificationObject.time = notification.notification.time
          } else {
            notificationObject.title = notification.notification.type
            notificationObject.body = notification.notification.body
            notificationObject.createdBy = notification.notification.title + ' ' + notification.notification.action
            notificationObject.avatar = notification.notification.avatar
            notificationObject.repositoryName = notification.notification.repositoryName
            notificationObject.time = notification.notification.time
          }

          notificationsArray.push(notificationObject)
        })
        dispatch({ type: FETCH_NOTIFICATIONS, payload: notificationsArray.reverse() })
        notificationsArray = []
      }
    })
  }
}

