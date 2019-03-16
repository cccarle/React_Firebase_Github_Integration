import { SHOW_NOTIFICATIONS, SHOW_REPOSITORIES, SHOW_ORGANIZATION, SHOW_PROFILE, SHOW_SUBSCRIPTIONS } from './types'

export const showNotification = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_NOTIFICATIONS, payload: true })
  }
}

export const showRepositories = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_REPOSITORIES, payload: true })
    dispatch({ type: SHOW_NOTIFICATIONS, payload: false })
  }
}

export const showOrganizations = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_REPOSITORIES, payload: false })
    dispatch({ type: SHOW_NOTIFICATIONS, payload: false })
    dispatch({ type: SHOW_ORGANIZATION, payload: true })
  }
}

export const showProfile = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_PROFILE, payload: true })
    dispatch({ type: SHOW_REPOSITORIES, payload: false })
    dispatch({ type: SHOW_NOTIFICATIONS, payload: false })
    dispatch({ type: SHOW_ORGANIZATION, payload: false })
    dispatch({ type: SHOW_SUBSCRIPTIONS, payload: false })
  }
}

export const showSubscriptions = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_SUBSCRIPTIONS, payload: true })
    dispatch({ type: SHOW_PROFILE, payload: false })
    dispatch({ type: SHOW_REPOSITORIES, payload: false })
    dispatch({ type: SHOW_NOTIFICATIONS, payload: false })
    dispatch({ type: SHOW_ORGANIZATION, payload: false })
  }
}

