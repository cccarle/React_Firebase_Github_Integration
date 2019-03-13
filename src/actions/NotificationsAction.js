import { FETCH_NOTIFICATIONS } from './types'
import {} from '../utils/helpers'
import firebase from '../config/firebase'
const messaging = firebase.messaging()

export const fetchNotifications = () => {
  var notificationsArray = []
  return (dispatch) => {
    messaging.onMessage((payload) => {
      notificationsArray.push(payload)
      dispatch({ type: FETCH_NOTIFICATIONS, payload: notificationsArray })
    })
  }
}
