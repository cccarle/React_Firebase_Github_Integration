import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import reposReducer from './ReposReducer'
import orgsReducer from './OrgsReducer'
import notificationsReducer from './notificationsReducer'
import toggelReducers from './toggelReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  repos: reposReducer,
  orgs: orgsReducer,
  notification: notificationsReducer,
  toggel: toggelReducers
})
