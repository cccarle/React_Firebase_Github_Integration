import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import reposReducer from './ReposReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  repos: reposReducer
})
