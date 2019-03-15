import { GET_USER_PROFILE_DATA } from '../actions/types'

const initialState = {
  profileAvatar: '',
  profileName: '',
  githubURL: ''

}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE_DATA:
      return action.payload

    default:
      return state
  }
}
