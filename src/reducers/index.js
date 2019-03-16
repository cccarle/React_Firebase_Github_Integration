import { combineReducers } from 'redux'
import authReducer from './AuthReducer'
import profileReducer from './ProfileReducer'
import reposReducer from './ReposReducer'
import orgsReducer from './OrgsReducer'
import notificationsReducer from './NotificationsReducer'
import toggelReducers from './ToggelReducer'
import subscriptionReducers from './SubscriptionReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  repos: reposReducer,
  orgs: orgsReducer,
  notification: notificationsReducer,
  toggel: toggelReducers,
  subscription: subscriptionReducers
})
