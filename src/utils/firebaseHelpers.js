import { getGitHubToken, getCurrentLoggedInGithubID, currentLoggedInUserFirestoreReference } from './helpers'
import firebase from '../config/firebase'
let db = firebase.firestore()

/* 
Retrieve github repositories from authenticated user and saves it as objects to firestore under field "repos"
*/

export const saveReposToFireStore = async () => {
    window
        .fetch('https://api.github.com/user/repos', {
            headers: { Authorization: 'token ' + await getGitHubToken() }
        })
        .then((response) => response.json())
        .then(repo => {
            let keys = Object.keys(repo)

            for (var i = 0; i < keys.length; i++) {
                let k = keys[i]
                let repos = {}

                var reposObject = {
                    'id': repo[k].id,
                    'name': repo[k].name,
                    'hooks_url': repo[k].hooks_url,
                    'url': repo[k].url,
                    'owner': repo[k].owner.login,
                    'admin': repo[k].permissions.admin,
                    'avatarURL': repo[k].owner.avatar_url
                }

                repos[`${reposObject.id}`] = reposObject

                db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).set({ repos: repos }, { merge: true })
            }
        })
}

/* 
Retrieve github repositories from authenticated user and saves it as objects to firestore under field "reposInOrgs"
*/


export const saveReposInOrgsToFireStore = async (orgName) => {
    window
        .fetch(`https://api.github.com/orgs/${orgName}/repos`, {
            headers: { Authorization: 'token ' + await getGitHubToken() }
        })
        .then((response) => response.json())
        .then(repo => {
            let keys = Object.keys(repo)

            for (var i = 0; i < keys.length; i++) {
                let k = keys[i]

                let reposInOrgs = {}

                let reposInOrgObject = {
                    'id': repo[k].id,
                    'name': repo[k].name,
                    'hooks_url': repo[k].hooks_url,
                    'url': repo[k].url,
                    'owner': repo[k].owner.login,
                    'admin': repo[k].permissions.admin,
                    'avatarURL': repo[k].owner.avatar_url,
                    'reposInOrgss': true
                }

                reposInOrgs[`${reposInOrgObject.id}`] = reposInOrgObject

                db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).set({ reposInOrgs: reposInOrgs }, { merge: true })
            }
        })
}


/* 
Retrieve github organizations from authenticated user and saves it as objects to firestore under field "orgs"
*/

export const saveOrgsToFireStore = async () => {
    window
        .fetch(`https://api.github.com/user/orgs`, {
            headers: { Authorization: 'token ' + await getGitHubToken() }
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

                saveReposInOrgsToFireStore(data[k].login)

                orgs[`${orgsObject.id}`] = orgsObject

                db.collection('users').doc(`${getCurrentLoggedInGithubID()}`).set({ orgs: orgs }, { merge: true })
            }
        })
}

/* 
    Update the repository active status in the organization depending on if a webhook has been created or deleted
*/

export const updateReposInOrgs = (repo, data, activeStatus) => {
    let update = {}

    if (data === null) {
        data = repo
    }

    let obj = {
        active: activeStatus,
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

    update[`reposInOrgs.${repo.id}`] = obj
    currentLoggedInUserFirestoreReference().update(update)
}

/* 
    Update the repository active status depending on if a webhook has been created or deleted
*/

export const updateRepos = (repo, data, activeStatus) => {
    let update = {}

    if (data === null) {
        data = repo
    }
    console.log(activeStatus)

    let obj = {
        active: activeStatus,
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

    currentLoggedInUserFirestoreReference().update(update)
}

export const updateNotifications = (repo) => {
    let batch = db.batch()
    currentLoggedInUserFirestoreReference().collection('notifications').get().then(data => {
        data.forEach(element => {
            batch.update(element.ref, { staus: true })
        })
        batch.commit()
    })
}

export const deleteNotifications = () => {
    let batch = db.batch()
    currentLoggedInUserFirestoreReference().collection('notifications').get().then(data => {
        data.forEach(element => {
            batch.delete(element.ref)
        })
        batch.commit()
    })
}




