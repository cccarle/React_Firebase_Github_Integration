import { GET_ORGS_DATA, GET_REPOS_IN_ORGS } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORGS_DATA:
      return action.payload

    case GET_REPOS_IN_ORGS:
      console.log(action.payload)
      return action.payload

    default:
      return state
  }
}
