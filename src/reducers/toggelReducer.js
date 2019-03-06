import {
  SHOW_NOTIFICATIONS,
  SHOW_REPOSITORIES,
  SHOW_ORGANIZATION
} from '../actions/types'

const initialState = {
  showNotifications: false,
  showRepositories: false,
  showOrganization: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATIONS:
      return {
        ...state,
        showNotifications: action.payload
      }

    case SHOW_REPOSITORIES:
      return {
        ...state,
        showRepositories: action.payload
      }

    case SHOW_ORGANIZATION:
      return {
        ...state,
        showOrganization: action.payload
      }

    default:
      return state
  }
}
