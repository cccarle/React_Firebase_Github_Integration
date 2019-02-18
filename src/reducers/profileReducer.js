import { GET_USER_PROFILE_DATA } from '../actions/types'

const initialState = {
  profileAvatar: '',
  profileName: '',
  githubURL: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE_DATA:
      console.log(action.payload)
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
