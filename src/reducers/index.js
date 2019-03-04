import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import reposReducer from './ReposReducer'
import subscriptionReducer from './SubscriptionReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  repos: reposReducer
})
