import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOrgsDataGithubAPI, fetchReposInOrg } from '../../actions'
import { addWebhook, deleteWebhook } from '../../utils/helpers'
import _ from 'lodash'
// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListHeader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import styles from './OrgsList.style'

class RepoList extends React.Component {

	viewReposInOrg = (org) => {
		this.props.fetchReposInOrg(org)
	}

	renderOrgs = () => {
		this.props.fetchOrgsDataGithubAPI()
	}

	addWebhook = (org) => {
		addWebhook(org)
	}

	deleteHook = (org) => {
		deleteWebhook(org)
	}


	renderButton = (orgs, classes) => {
		if (orgs.reposURL) {
			return (
				<div>
					<Button onClick={() => this.viewReposInOrg(orgs)} variant="contained" className={classes.button}>
						View
					</Button>
				</div>
			)
		} else if (orgs.reposURL && !orgs.admin || orgs.reposInOrgss && !orgs.admin) {
			return (
				<Button variant="contained" className={classes.button}>
					Not admin
				</Button>
			)
		} else if (orgs.active) {
			return (
				<Button onClick={() => this.deleteHook(orgs)} variant="contained" className={classes.button}>
					Unsubscribe
				</Button>
			)
		} else {
			return (
				<Button onClick={() => this.addWebhook(orgs)} variant="contained" className={classes.button}>
					Subscribe
				</Button>
			)
		}

	}

	checkWhichAvatarToRender = (orgs) => {
		if (orgs.avatarIMG) {
			return orgs.avatarIMG
		} else {
			return orgs.avatarURL
		}
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={classes.gridList}>
					<GridListTile key="header" cols={2} style={{ height: 'auto' }}>
						<ListHeader component="div">
							<div className={classes.hrContainer}>

								<Typography className={classes.headerText} variant="overline" gutterBottom>
									Github Organizations
									<hr />
								</Typography>
							</div>

						</ListHeader>
					</GridListTile>
					{this.props.orgs.map((orgs) => (
						<GridListTile key={orgs.name}>
							<img src={this.checkWhichAvatarToRender(orgs)} alt={'avatar'} />
							<GridListTileBar
								title={orgs.name}
								key={orgs.name}
								subtitle={<span> {orgs.url}</span>}
								actionIcon={this.renderButton(orgs, classes)}
							/>
						</GridListTile>
					))}
					<Button onClick={() => this.renderOrgs()} variant="contained" className={classes.backButton}>
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

const mapStateToProps = (state) => {
	const orgs = _.map(state.orgs, (val) => {
		return { ...val }
	})

	return { orgs }
}

export default connect(mapStateToProps, {
	fetchOrgsDataGithubAPI,
	fetchReposInOrg
})(withStyles(styles)(RepoList))
