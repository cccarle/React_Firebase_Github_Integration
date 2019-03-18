import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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

// Styles
import styles from './RepoList.Style'

class RepoList extends React.Component {

	turnOffNotification = (repo) => {
		deleteWebhook(repo)
	}

	turnOnNotification = (repo) => {
		addWebhook(repo)
	}

	renderButton = (repos, classes) => {
		if (repos.active) {
			return (
				<Button
					onClick={() => this.turnOffNotification(repos)}
					variant="contained"
					className={classes.button}
				>
					Unsubscribe
				</Button>
			)
		} else {
			return (
				<Button
					onClick={() => this.turnOnNotification(repos)}
					variant="outlined"
					className={classes.button}
				>
					Subscribe
				</Button>
			)
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
									Github Repositories
									<hr />
								</Typography>
							</div>
						</ListHeader>
					</GridListTile>
					{this.props.repos.map((repos) => (
						<GridListTile key={repos.id}>
							<img src={repos.avatarURL} alt={repos.name} />
							<GridListTileBar
								title={repos.name}
								subtitle={<span>owner: {repos.owner}</span>}
								actionIcon={this.renderButton(repos, classes)}
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

const mapStateToProps = (state) => {
	const repos = _.map(state.repos, (val) => {
		return { ...val }
	})

	return { repos }
}

export default connect(mapStateToProps, {})(withStyles(styles)(RepoList))



