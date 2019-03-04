import { GET_USER_PROFILE_DATA, GET_REPOS_DATA } from './types'

export const fetchUserDataFromGithubAPI = () => {
  return dispatch => {
    const accessToken = window.localStorage.getItem('token')
    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + accessToken }
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: GET_USER_PROFILE_DATA, payload: data })
      })
  }
}

export const fetchReposDataGithubAPI = () => {
  return dispatch => {
    const arrayToFilter = []
    const accessToken = window.localStorage.getItem('token')
    window
      .fetch('https://api.github.com/user/repos', {
        headers: { Authorization: 'token ' + accessToken }
      })
      .then(response => response.json())
      .then(data => {
        let keys = Object.keys(data)

        //  iterate the key
        for (var i = 0; i < keys.length; i++) {
          let k = keys[i]
          let name = data[k].name
          let hooks_url = data[k].hooks_url
          let url = data[k].url
          let owner = data[k].owner.login

          var repos = {
            name: '',
            hooks_url: '',
            url: '',
            owner: ''
          }

          repos.name = name
          repos.hooks_url = hooks_url
          repos.url = url
          repos.owner = owner

          arrayToFilter.push(repos)
        }

        dispatch({ type: GET_REPOS_DATA, payload: arrayToFilter })
      })
  }
}
