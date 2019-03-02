import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchReposDataGithubAPI } from '../../actions'
import _ from 'lodash'
import examplePic from '../../assets/examplepic.jpg'

// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListHeader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import Folder from '@material-ui/icons/Folder'

// Styles
import styles from './RepoList.Style'

class RepoList extends React.Component {
  componentDidMount () {
    this.props.fetchReposDataGithubAPI()
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key='header' cols={2} style={{ height: 'auto' }}>
            <ListHeader className={classes.headerText} component='div'>Github Repositories</ListHeader>
          </GridListTile>
          {this.props.repos.map(repos => (
            <GridListTile key={repos.name}>
              <img src={examplePic} alt={repos.name} />
              <GridListTileBar
                title={repos.name}
                key={repos.name}
                subtitle={<span>by: {repos.owner}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <Button variant='contained' className={classes.button}>
                      Subscribe
                    </Button>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

RepoList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const repos = _.map(state.repos, val => {
    return { ...val }
  })

  return { repos }
}

export default connect(
  mapStateToProps,
  { fetchReposDataGithubAPI }
)(withStyles(styles)(RepoList))
