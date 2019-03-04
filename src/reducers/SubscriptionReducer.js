import { ADD_WEBHOOK } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_WEBHOOK:
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
