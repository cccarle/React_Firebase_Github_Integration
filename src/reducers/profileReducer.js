import { GET_USER_PROFILE_DATA, TEST_DISPATCH } from '../actions/types'

const initialState = {
  profileAvatar: '',
  profileName: '',
  githubURL: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE_DATA:
      return {
        ...state,
        profileAvatar: action.payload.avatar_url,
        profileName: action.payload.name,
        githubURL: action.payload.url
      }

    default:
      return state
  }
}
