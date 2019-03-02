import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from '../../actions'

// Components
import Navbar from '../Navbar/Navbar'
import RepoList from '../RepoList/RepoList'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <RepoList />
      </div>
    )
  }
}

export default connect(
  null,
  {}
)(Dashboard)
