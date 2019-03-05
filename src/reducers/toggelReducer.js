import { TOGGEL_ON, TOGGEL_OFF } from '../actions/types'

const initialState = {
  toggel: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGEL_ON:
      return {
        ...state,
        toggel: true
      }

    case TOGGEL_OFF:
      return {
        ...state,
        toggel: false
      }

    default:
      return state
  }
}
