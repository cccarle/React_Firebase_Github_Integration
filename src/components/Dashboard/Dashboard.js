import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from '../../actions'
// Components
import Navbar from '../Navbar/Navbar'
import RepoList from '../RepoList/RepoList'
import OrgsList from '../OrgsList/OrgsList'
import Notifcations from '../Notifications/Notifications'
import { checkIfUserIsLoggedIn } from '../../actions'

class Dashboard extends Component {
  componentDidMount () {
    this.props.checkIfUserIsLoggedIn()
  }
  renderRepoOrNotificatin = () => {
    if (this.props.toggel.showNotifications === true) {
      return <Notifcations />
    } else if (this.props.toggel.showRepositories === true) {
      return <RepoList />
    } else if (this.props.toggel.showOrganization === true) {
      return <OrgsList />
    }
  }
  render () {
    return (
      <div>
        <Navbar />
        {this.renderRepoOrNotificatin()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps,
  { checkIfUserIsLoggedIn }
)(Dashboard)
