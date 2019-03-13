import { GET_REPOS_DATA, UPDATE_REPOS_DATA_WITH_HOOK_URL } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REPOS_DATA:
      return action.payload

    case UPDATE_REPOS_DATA_WITH_HOOK_URL:
      return action.payload
    default:
      return state
  }
}
