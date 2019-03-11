import { ADD_WEBHOOK, DELETE_WEBHOOK } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_WEBHOOK:
			return action.payload;

		case DELETE_WEBHOOK:
			return actions.payload;
		default:
			return state;
	}
}
