import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchReposDataGithubAPI,
  addWebhook,
  fetchOrgsDataGithubAPI
} from '../../actions'
import _ from 'lodash'
import examplePic from '../../assets/examplepic.jpg'

// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListHeader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'

// Styles
import styles from './RepoList.Style'

class RepoList extends React.Component {
  componentDidMount () {
    this.props.fetchReposDataGithubAPI()
  }

  addWebHooks = webhookURL => {
    this.props.addWebhook(webhookURL)
  }

  renderRepoListCards = (repos, classes) => {
    if (repos.length < 2) {
    } else {
      return repos.map(repos => (
        <GridListTile key={repos.id}>
          <img src={examplePic} alt={repos.name} />
          <GridListTileBar
            title={repos.name}
            subtitle={<span>by: {repos.owner}</span>}
            actionIcon={
              <Button
                onClick={() => this.addWebHooks(repos.hooks_url)}
                variant='contained'
                className={classes.button}
              >
                Subscribe
              </Button>
            }
          />
        </GridListTile>
      ))
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key='header' cols={2} style={{ height: 'auto' }}>
            <ListHeader className={classes.headerText} component='div'>
              Github Repositories
            </ListHeader>
          </GridListTile>
          {this.renderRepoListCards(this.props.repos, classes)}
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
  { fetchReposDataGithubAPI, addWebhook, fetchOrgsDataGithubAPI }
)(withStyles(styles)(RepoList))
