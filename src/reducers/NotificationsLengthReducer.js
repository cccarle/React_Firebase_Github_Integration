import { FETCH_NOTIFICATIONS_LENGTH } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_LENGTH:
            return action.payload
        default:
            return state
    }
}
