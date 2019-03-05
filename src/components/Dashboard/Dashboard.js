import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from '../../actions'
// Components
import Navbar from '../Navbar/Navbar'
import RepoList from '../RepoList/RepoList'
import Notifcations from '../Notifications/Notifications'
import _ from 'lodash'

class Dashboard extends Component {
  renderRepoOrNotificatin = () => {
    if (this.props.toggel === true) {
      return <Notifcations />
    } else {
      return <RepoList />
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
  return state.toggel
}

export default connect(
  mapStateToProps,
  {}
)(Dashboard)
