import { ADD_WEBHOOK, DELETE_WEBHOOK } from './types'
import { getGitHubToken, getConfigURL } from '../utils/helpers'

// export const addWebhook = (webhookURL) => {
//   return (dispatch) => {
//     let githubParameters = { events: ['issues', 'push'], name: 'web', config: getConfigURL() }

//     window
//       .fetch(webhookURL, {
//         method: 'POST',
//         body: JSON.stringify(githubParameters),
//         headers: {
//           Authorization: 'token ' + getGitHubToken(),
//           'Content-Type': 'application/json'
//         }
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data)
//         dispatch({ type: ADD_WEBHOOK, payload: data })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }

export const turnOffNotifications = (deleteURL) => {
  return (dispatch) => {
    window
      .fetch(deleteURL, {
        method: 'DELETE',
        headers: {
          Authorization: 'token ' + getGitHubToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        let response = {
          msg: 'deleted webhook',
          active: false
        }

        dispatch({ type: DELETE_WEBHOOK, payload: response })
      })
  }
}
