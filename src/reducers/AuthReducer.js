import { LOGGED_IN_SUCCES, SIGN_OUT } from '../actions/types'

const initialState = {
  isAuthenticated: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN_SUCCES:
      return {
        ...state,
        isAuthenticated: true
      }

    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false
      }

    default:
      return state
  }
}
