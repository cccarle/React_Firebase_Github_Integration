import { ADD_WEBHOOK, DELETE_WEBHOOK } from './types'
import { getGitHubToken, getConfigURL } from '../utils/helpers'

export const addWebhook = (webhookURL) => {
  return (dispatch) => {
    let githubParameters = { events: [ 'issues', 'push' ], name: 'web', config: getConfigURL() }

    window
      .fetch(webhookURL, {
        method: 'POST',
        body: JSON.stringify(githubParameters),
        headers: {
          Authorization: 'token ' + getGitHubToken(),
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: ADD_WEBHOOK, payload: data })
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const turnOffNotifications = (webhookURL) => {
  return (dispatch) => {
    let githubParameters = { active: false, config: getConfigURL() }

    window
      .fetch(webhookURL, {
        method: 'PATCH',
        body: JSON.stringify(githubParameters),
        headers: {
          Authorization: 'token ' + getGitHubToken(),
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: DELETE_WEBHOOK, payload: data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const turnOnNotifications = (webhookURL) => {
  return (dispatch) => {
    let githubParameters = { active: true, config: getConfigURL() }

    window
      .fetch(webhookURL, {
        method: 'PATCH',
        body: JSON.stringify(githubParameters),
        headers: {
          Authorization: 'token ' + getGitHubToken(),
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dispatch({ type: DELETE_WEBHOOK, payload: data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
