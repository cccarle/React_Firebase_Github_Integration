import { SHOW_NOTIFICATIONS, SHOW_REPOSITORIES, SHOW_ORGANIZATION } from './types'

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
