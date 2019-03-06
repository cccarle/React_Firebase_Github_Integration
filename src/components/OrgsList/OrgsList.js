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
import styles from './OrgsList.style'

class RepoList extends React.Component {
  componentDidMount () {
    this.props.fetchReposDataGithubAPI()
    this.props.fetchOrgsDataGithubAPI()
  }

  addWebHooks = webhookURL => {
    this.props.addWebhook(webhookURL)
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key='header' cols={2} style={{ height: 'auto' }}>
            <ListHeader className={classes.headerText} component='div'>
              Github Organizations
            </ListHeader>
          </GridListTile>
          {this.props.orgs.map(orgs => (
            <GridListTile key={orgs.name}>
              <img src={orgs.avatar_url} alt={'avatar'} />
              <GridListTileBar
                title={orgs.name}
                key={orgs.name}
                subtitle={<span> {orgs.url}</span>}
                actionIcon={
                  <Button
                    onClick={() => this.addWebHooks(orgs.hooks_url)}
                    variant='contained'
                    className={classes.button}
                  >
                    Subscribe
                  </Button>
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
  const orgs = _.map(state.orgs, val => {
    return { ...val }
  })

  return { orgs }
}

export default connect(
  mapStateToProps,
  { fetchReposDataGithubAPI, addWebhook, fetchOrgsDataGithubAPI }
)(withStyles(styles)(RepoList))
