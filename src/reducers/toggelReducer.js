import { SHOW_NOTIFICATIONS, SHOW_REPOSITORIES, SHOW_ORGANIZATION, SHOW_PROFILE, SHOW_SUBSCRIPTIONS } from '../actions/types'

const initialState = {
  showNotifications: false,
  showRepositories: false,
  showOrganization: false,
  showSubscription: false,
  showProfile: true
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

    case SHOW_PROFILE:
      return {
        ...state,
        showProfile: action.payload
      }

      case SHOW_SUBSCRIPTIONS:
      return {
        ...state,
        showSubscription: action.payload
      }

    default:
      return state
  }
}
