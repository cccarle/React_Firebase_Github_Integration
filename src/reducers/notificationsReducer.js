import { FETCH_NOTIFICATIONS } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      console.log(action.payload)

      return action.payload

    default:
      return state
  }
}
