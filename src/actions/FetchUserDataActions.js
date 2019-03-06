import {
  GET_USER_PROFILE_DATA,
  GET_REPOS_DATA,
  GET_ORGS_DATA,
  GET_REPOS_IN_ORGS
} from './types'

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

export const fetchOrgsDataGithubAPI = () => {
  return dispatch => {
    const arrayToFilter = []
    const accessToken = window.localStorage.getItem('token')

    window
      .fetch('https://api.github.com/user/orgs', {
        headers: { Authorization: 'token ' + accessToken }
      })
      .then(response => response.json())
      .then(data => {
        let keys = Object.keys(data)

        for (var i = 0; i < keys.length; i++) {
          let k = keys[i]
          let avatar_url = data[k].avatar_url
          let hooks_url = data[k].hooks_url
          let id = data[k].id
          let name = data[k].login
          let url = data[k].url

          var orgs = {
            avatar_url: '',
            hooks_url: '',
            id: '',
            url: '',
            name: ''
          }

          orgs.avatar_url = avatar_url
          orgs.hooks_url = hooks_url
          orgs.id = id
          orgs.name = name
          orgs.url = url

          arrayToFilter.push(orgs)
        }

        dispatch({ type: GET_ORGS_DATA, payload: arrayToFilter })
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

        for (var i = 0; i < keys.length; i++) {
          let k = keys[i]
          let name = data[k].name
          let hooks_url = data[k].hooks_url
          let url = data[k].url
          let owner = data[k].owner.login
          let id = data[k].id

          var repos = {
            name: '',
            hooks_url: '',
            url: '',
            owner: '',
            id: ''
          }

          repos.name = name
          repos.hooks_url = hooks_url
          repos.url = url
          repos.owner = owner
          repos.id = id

          arrayToFilter.push(repos)
        }

        dispatch({ type: GET_REPOS_DATA, payload: arrayToFilter })
      })
  }
}

export const fetchReposInOrg = orgName => {
  return dispatch => {
    window
      .fetch(`https://api.github.com/orgs/${orgName}/repos`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: GET_REPOS_IN_ORGS, payload: data })
      })
  }
}
