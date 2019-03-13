import { GET_USER_PROFILE_DATA, GET_REPOS_DATA, GET_ORGS_DATA, GET_REPOS_IN_ORGS } from './types'
import { getGitHubToken } from '../utils/helpers'

export const fetchUserDataFromGithubAPI = () => {
  return (dispatch) => {
    window
      .fetch('https://api.github.com/user', {
        headers: { Authorization: 'token ' + getGitHubToken() }
      })
      .then((response) => response.json())
      .then((githubUserProfileData) => {
        dispatch({ type: GET_USER_PROFILE_DATA, payload: githubUserProfileData })
      })
  }
}

export const fetchOrgsDataGithubAPI = () => {
  return (dispatch) => {
    const orgsArray = []

    window
      .fetch('https://api.github.com/user/orgs', {
        headers: { Authorization: 'token ' + getGitHubToken() }
      })
      .then((response) => response.json())
      .then((data) => {
        let keys = Object.keys(data)

        for (var i = 0; i < keys.length; i++) {
          let k = keys[i]
          let avatar_url = data[k].avatar_url
          let hooks_url = data[k].hooks_url
          let id = data[k].id
          let name = data[k].login
          let url = data[k].url
          let repos_url = data[k].url

          let orgs = {}

          orgs.avatar_url = avatar_url
          orgs.hooks_url = hooks_url
          orgs.id = id
          orgs.name = name
          orgs.url = url
          orgs.repos_url = repos_url

          orgsArray.push(orgs)
        }

        dispatch({ type: GET_ORGS_DATA, payload: orgsArray })
      })
  }
}

export const fetchReposDataGithubAPI = () => {
  return (dispatch) => {
    const reposArray = []

    window
      .fetch('https://api.github.com/user/repos', {
        headers: { Authorization: 'token ' + getGitHubToken() }
      })
      .then((response) => response.json())
      .then((data) => {
        let keys = Object.keys(data)

        for (var i = 0; i < keys.length; i++) {
          let k = keys[i]
          let name = data[k].name
          let hooks_url = data[k].hooks_url
          let url = data[k].url
          let owner = data[k].owner.login
          let id = data[k].id
          let admin = data[k].permissions.admin

          let repos = {}

          repos.name = name
          repos.hooks_url = hooks_url
          repos.url = url
          repos.owner = owner
          repos.id = id
          repos.admin = admin
          repos.active = false
          repos.editURL = ''

          reposArray.push(repos)
        }

        let reposOnlyAdminArray = reposArray.filter((repo) => repo.admin === true)
        dispatch({ type: GET_REPOS_DATA, payload: reposOnlyAdminArray })
      })
  }
}

export const fetchReposInOrg = (orgName) => {
  return (dispatch) => {
    let adminReposInOrg = []
    window
      .fetch(`https://api.github.com/orgs/${orgName}/repos`)
      .then((response) => response.json())
      .then((data) => {
        let keys = Object.keys(data)

        for (var i = 0; i < keys.length; i++) {
          let k = keys[i]
          let name = data[k].name
          let hooks_url = data[k].hooks_url
          let url = data[k].url
          let owner = data[k].owner.login
          let id = data[k].id
          let admin = data[k].permissions.admin

          var reposInOrg = {}

          reposInOrg.name = name
          reposInOrg.hooks_url = hooks_url
          reposInOrg.url = url
          reposInOrg.owner = owner
          reposInOrg.id = id
          reposInOrg.admin = admin

          adminReposInOrg.push(reposInOrg)
        }

        dispatch({ type: GET_REPOS_IN_ORGS, payload: adminReposInOrg })
      })
  }
}
