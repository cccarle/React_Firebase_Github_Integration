import firebase from '../config/firebase'
let db = firebase.firestore()
let messaging = firebase.messaging()

export const getCurrentLoggedInUserID = () => {
  let user = firebase.auth().currentUser
  return user.uid
}

export const getCurrentLoggedInGithubID = () => {
  let id = window.localStorage.getItem('loggedInUser')
  return id
}

export const allowNotifications = () => {
  messaging
    .requestPermission()
    .then(() => {
      console.log('have permission')
      return messaging.getToken()
    })
    .then((token) => {
      let userID = getCurrentLoggedInGithubID()

      let userRef = db.collection('users').doc(userID)

      let setWithMerge = userRef.set(
        {
          msgToken: token
        },
        { merge: true }
      )
    })
    .catch((err) => {
      console.log(err)
    })
}

export const setGitHubToken = (accessToken) => {
  window.localStorage.setItem('token', accessToken)
}

export const getGitHubToken = () => {
  const accessToken = window.localStorage.getItem('token')
  return accessToken
}

export const getConfigURL = () => {
  let config = {
    url: `https://us-central1-guthubdashboard.cloudfunctions.net/events?id=${getCurrentLoggedInUserID()}`,
    content_type: 'json'
  }
  return config
}


export const addWebhook = (repo) => {
  let githubParameters = { events: ['issues', 'push'], name: 'web', config: getConfigURL() }

  window
    .fetch(repo.hooks_url, {
      method: 'POST',
      body: JSON.stringify(githubParameters),
      headers: {
        Authorization: 'token ' + getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {



      console.log(repo)

      if (repo.reposInOrgs === true) {

        let update = {};

        let reposInOrgs = {
          active: true,
          admin: repo.admin,
          avatarURL: repo.avatarURL,
          hooks_url: repo.hooks_url,
          id: repo.id,
          name: repo.name,
          owner: repo.owner,
          url: repo.url,
          hooksID: data.url,
          reposInOrgss: true

        }

        update[`reposInOrgs.${repo.id}`] = reposInOrgs
        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).update(update)

      } else {
        let update = {};

        let obj = {
          active: true,
          admin: repo.admin,
          avatarURL: repo.avatarURL,
          hooks_url: repo.hooks_url,
          id: repo.id,
          name: repo.name,
          owner: repo.owner,
          url: repo.url,
          hooksID: data.url
        }
        update[`repos.${repo.id}`] = obj

        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).update(update)
      }


    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteWebhook = (repo) => {
  window
    .fetch(repo.hooksID, {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + getGitHubToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      let obj = {
        active: false,
        admin: repo.admin,
        avatarURL: repo.avatarURL,
        hooks_url: repo.hooks_url,
        id: repo.id,
        name: repo.name,
        owner: repo.owner,
        url: repo.url,
        hooksID: repo.hooksID
      }

      const update = {}

      update[`repos.${repo.id}`] = obj

      db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).update(update)
    })
}


export const saveOrgsToFireStore = () => {

  window
    .fetch(`https://api.github.com/user/orgs`, {
      headers: { Authorization: 'token ' + getGitHubToken() }
    })
    .then((response) => response.json())
    .then(async (data) => {
      let keys = Object.keys(data)
      for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        let orgs = {}

        let orgsObject = {
          'id': data[k].id,
          'name': data[k].login,
          'hooks_url': data[k].hooks_url,
          'url': data[k].url,
          'avatarURL': data[k].avatar_url,
          'reposURL': data[k].repos_url

        }

        orgs[`${orgsObject.id}`] = orgsObject

        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).set({ orgs: orgs }, { merge: true })
      }
    })
}

export const saveReposInOrgsToFireStore = (orgName) => {

  window
    .fetch(`https://api.github.com/orgs/${orgName}/repos`, {
      headers: { Authorization: 'token ' + getGitHubToken() }
    })
    .then((response) => response.json())
    .then(async (data) => {
      let keys = Object.keys(data)
      console.log(data)
      for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        let reposInOrgs = {}

        let orgsObject = {
          'id': data[k].id,
          'name': data[k].name,
          'hooks_url': data[k].hooks_url,
          'url': data[k].url,
          'owner': data[k].owner.login,
          'admin': data[k].permissions.admin,
          'avatarURL': data[k].owner.avatar_url,
          'reposInOrgss': true

        }

        reposInOrgs[`${orgsObject.id}`] = orgsObject

        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).set({ reposInOrgs: reposInOrgs }, { merge: true })
      }
    })
}
export const saveRepoToFireStore = () => {

  window
    .fetch('https://api.github.com/user/repos', {
      headers: { Authorization: 'token ' + getGitHubToken() }
    })
    .then((response) => response.json())
    .then(async (data) => {
      let keys = Object.keys(data)
      console.log(data)

      for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        let repos = {}
        var reposObject = {
          'id': data[k].id,
          'name': data[k].name,
          'hooks_url': data[k].hooks_url,
          'url': data[k].url,
          'owner': data[k].owner.login,
          'admin': data[k].permissions.admin,
          'avatarURL': data[k].owner.avatar_url
        }

        repos[`${reposObject.id}`] = reposObject

        db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).set({ repos: repos }, { merge: true })
      }
    })
}

