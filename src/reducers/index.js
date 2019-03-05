import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import reposReducer from './ReposReducer'
import subscriptionReducer from './SubscriptionReducer'
import notificationsReducer from './notificationsReducer'
import toggelReducers from './toggelReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  repos: reposReducer,
  notification: notificationsReducer,
  toggel: toggelReducers
})
