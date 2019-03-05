import { FETCH_NOTIFICATIONS } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload

    default:
      return state
  }
}
