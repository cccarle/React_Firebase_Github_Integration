import { FETCH_NOTIFICATIONS } from './types'
import { currentLoggedInUserFirestoreReference } from '../utils/helpers'

/* 
  Fetches all notifications in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchNotifications = () => {
  var notificationsArray = []
  return (dispatch) => {

    currentLoggedInUserFirestoreReference().onSnapshot(function (doc) {
      if (doc.exists && doc.data().notifications) {
        let notifications = doc.data().notifications
        notifications.forEach(notification => {
          let notificationObject = {}
          notificationObject.title = notification.notification.title
          notificationObject.body = notification.notification.body
          notificationObject.createdBy = notification.notification.header
          notificationObject.avatar = notification.notification.avatar
          notificationObject.repositoryName = notification.notification.repositoryName
          notificationObject.time = notification.notification.time


          notificationsArray.push(notificationObject)
        })
        dispatch({ type: FETCH_NOTIFICATIONS, payload: notificationsArray.reverse() })
        notificationsArray = []
      }
    })
  }
}


// export const deleteUserNotices = () => {
//   let user = firebase.auth().currentUser
//   let dbData = firebase.firestore().collection('notices').where('firebaseId', '==', user.uid)
//   dbData.get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       doc.ref.delete()
//     })
//   }

//   )
// }