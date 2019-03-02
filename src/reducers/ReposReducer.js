import { GET_REPOS_DATA } from '../actions/types'

const initialState = {
  name: '',
  hooksURL: '',
  url: '',
  owner: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REPOS_DATA:
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
