import { FETCH_NOTIFICATIONS, FETCH_NOTIFICATIONS_LENGTH } from './types'
import { currentLoggedInUserFirestoreReference } from '../utils/helpers'

/* 
  Fetches all notifications in realtime from authenticated users firestore & update the state with the new data
*/

export const fetchNotifications = () => {
  var notificationsArray = []
  return async (dispatch) => {
    await currentLoggedInUserFirestoreReference().collection('notifications').onSnapshot(function (querySnapshot) {

      querySnapshot.forEach(function (doc) {

        let element = doc.data()

        let elementObject = {}

        if (element.type === 'issue') {
          elementObject.title = element.title
          elementObject.body = element.body
          elementObject.createdBy = element.header + element.type
          elementObject.avatar = element.avatar
          elementObject.repositoryName = element.repositoryName
          elementObject.time = element.time
          elementObject.repoID = element.repoID
          elementObject.staus = element.staus


        } else {
          elementObject.title = element.type
          elementObject.body = element.body
          elementObject.createdBy = element.title + ' ' + element.action
          elementObject.avatar = element.avatar
          elementObject.repositoryName = element.repositoryName
          elementObject.time = element.time
          elementObject.staus = element.staus

        }

        notificationsArray.push(elementObject)


        let latestNotifications = notificationsArray.filter(child => child.staus != true)

        dispatch({ type: FETCH_NOTIFICATIONS_LENGTH, payload: latestNotifications.reverse() })

      });

      dispatch({ type: FETCH_NOTIFICATIONS, payload: notificationsArray })

      notificationsArray = []

    })
  }
}

// om repo är true lägg till FETCH_NOTIFICATIONS
// om repo inte är true lägg till i FETCH_NOTIFICATIONS_LENGTH

export const clearNotification = () => {

  return (dispatch) => {
    let notificationsArray = []
    dispatch({ type: FETCH_NOTIFICATIONS_LENGTH, payload: notificationsArray.reverse() })
  }
}