import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchReposDataGithubAPI,
  addWebhook,
  fetchOrgsDataGithubAPI,
  fetchReposInOrg
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
  componentDidMount() {
    this.props.fetchOrgsDataGithubAPI()
  }

  addWebHooks = name => {
    let orgName = name

    this.props.fetchReposInOrg(orgName)
  }

  renderOrgs = () => {
    this.props.fetchOrgsDataGithubAPI()
  }


  checkIfAdmin = (orgs, classes) => {
    if (orgs.admin === true || orgs.repos_url) {
      return (<Button
        onClick={() => this.addWebHooks(orgs.name)}
        variant='contained'
        className={classes.button}
      >
        View
</Button>)
    } else {
      return (<Button
        variant='contained'
        className={classes.button}
      >
        Not admin
</Button>)
    }
  }

  checkIfAvatar = avatar => {
    if (avatar === undefined) {
      return examplePic
    } else {
      return avatar
    }
  }

  render() {
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
              <img src={this.checkIfAvatar(orgs.avatar_url)} alt={'avatar'} />
              <GridListTileBar
                title={orgs.name}
                key={orgs.name}
                subtitle={<span> {orgs.url}</span>}
                actionIcon={
                  this.checkIfAdmin(orgs, classes)
                }
              />
            </GridListTile>
          ))}
          <Button
            onClick={() => this.renderOrgs()}
            variant='contained'
            className={classes.backButton}
          >
            Back
          </Button>
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
  {
    fetchReposDataGithubAPI,
    addWebhook,
    fetchOrgsDataGithubAPI,
    fetchReposInOrg
  }
)(withStyles(styles)(RepoList))