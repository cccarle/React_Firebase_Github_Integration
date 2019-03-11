import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchReposDataGithubAPI, addWebhook, turnOffNotifications, turnOnNotifications } from '../../actions';
import _ from 'lodash';
import examplePic from '../../assets/examplepic.jpg';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListHeader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';

// Styles
import styles from './RepoList.Style';

class RepoList extends React.Component {
	addWebHooks = (webhookURL) => {
		this.props.addWebhook(webhookURL);
	};

	turnOffNotification = (webhookURL) => {
		this.props.turnOffNotifications(webhookURL);
	};

	turnOnNotification = (webhookURL) => {
		this.props.turnOnNotifications(webhookURL);
	};

	renderButton = (repos, classes) => {
		if (repos.active === true) {
			return (
				<Button
					onClick={() => this.turnOffNotification(repos.hookURLDelete)}
					variant="contained"
					className={classes.button}
				>
					Turn off notifications
				</Button>
			);
		} else if (repos.active === false) {
			return (
				<Button
					onClick={() => this.turnOnNotification(repos.hookURLDelete)}
					variant="outlined"
					className={classes.button}
				>
					Turn on notifications
				</Button>
			);
		} else {
			return (
				<Button
					onClick={() => this.addWebHooks(repos.hooks_url)}
					variant="contained"
					className={classes.button}
				>
					Subscribe to notifications
				</Button>
			);
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={classes.gridList}>
					<GridListTile key="header" cols={2} style={{ height: 'auto' }}>
						<ListHeader className={classes.headerText} component="div">
							Github Repositories
						</ListHeader>
					</GridListTile>
					{this.props.repos.map((repos) => (
						<GridListTile key={repos.id}>
							<img src={examplePic} alt={repos.name} />
							<GridListTileBar
								title={repos.name}
								subtitle={<span>by: {repos.owner}</span>}
								actionIcon={this.renderButton(repos, classes)}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}

RepoList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const repos = _.map(state.repos, (val) => {
		return { ...val };
	});

	return { repos };
};

export default connect(mapStateToProps, {
	fetchReposDataGithubAPI,
	addWebhook,
	turnOffNotifications,
	turnOnNotifications
})(withStyles(styles)(RepoList));
