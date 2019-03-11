import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import reposReducer from './reposReducer';
import orgsReducer from './orgsReducer';
import notificationsReducer from './notificationsReducer';
import toggelReducers from './toggelReducer';
import notificationsButtonsReducer from './notificationsButtonsReducer';

export default combineReducers({
	auth: authReducer,
	profile: profileReducer,
	repos: reposReducer,
	orgs: orgsReducer,
	notification: notificationsReducer,
	toggel: toggelReducers,
	notificationButtons: notificationsButtonsReducer
});
