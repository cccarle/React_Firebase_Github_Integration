import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from '../../actions'

// Components
import Navbar from '../Navbar/Navbar'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Navbar />
      </div>
    )
  }
}

export default connect(
  null,
  {}
)(Dashboard)
