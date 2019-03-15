import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchReposDataGithubAPI, fetchOrgsDataGithubAPI, fetchReposInOrg } from '../../actions';
import { addWebhook, deleteWebhook, saveReposInOrgsToFireStore } from '../../utils/helpers'
import _ from 'lodash';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListHeader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Styles
import styles from './OrgsList.style';

class RepoList extends React.Component {
	componentDidMount() {
		this.props.fetchOrgsDataGithubAPI();
	}

	viewReposInOrg = (org) => {
		console.log(org)
		this.props.fetchReposInOrg(org);
	};

	addWebHOOK = (orgs) => {
		addWebhook(orgs);
	};

	deleteHook = (orgs) => {
		deleteWebhook(orgs)
	}

	renderOrgs = () => {
		this.props.fetchOrgsDataGithubAPI();
	};

	checkIfAdmin = (orgs, classes) => {

		if (orgs.reposURL) {
			return (
				<div>
					<Button onClick={() => this.viewReposInOrg(orgs)} variant="contained" className={classes.button}>
						View
					</Button>
				</div>
			);
		} else if (orgs.reposURL && orgs.admin === false) {
			return (
				<Button variant="contained" className={classes.button}>
					Not admin
				</Button>
			);
		} else if (orgs.active === true) {
			return (
				<Button onClick={() => this.deleteHook(orgs)} variant="contained" className={classes.button}>
					Unsubscribe
				</Button>
			);
		} else {
			return (
				<Button onClick={() => this.addWebHOOK(orgs)} variant="contained" className={classes.button}>
					Subscribe
				</Button>
			);
		}

	};

	checkIfAvatar = (orgs) => {
		if (orgs.avatarIMG) {
			return orgs.avatarIMG;
		} else {
			return orgs.avatarURL;
		}
	};

	render() {
		const { classes } = this.props;
		console.log(this.props.orgs)
		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={classes.gridList}>
					<GridListTile key="header" cols={2} style={{ height: 'auto' }}>
						<ListHeader component="div">
							<Typography className={classes.headerText} variant="overline" gutterBottom>
								Github Organizations
							</Typography>
						</ListHeader>
					</GridListTile>
					{this.props.orgs.map((orgs) => (
						<GridListTile key={orgs.name}>
							<img src={this.checkIfAvatar(orgs)} alt={'avatar'} />
							<GridListTileBar
								title={orgs.name}
								key={orgs.name}
								subtitle={<span> {orgs.url}</span>}
								actionIcon={this.checkIfAdmin(orgs, classes)}
							/>
						</GridListTile>
					))}
					<Button onClick={() => this.renderOrgs()} variant="contained" className={classes.backButton}>
						Back
					</Button>
				</GridList>
			</div>
		);
	}
}

RepoList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const orgs = _.map(state.orgs, (val) => {
		return { ...val };
	});

	return { orgs };
};

export default connect(mapStateToProps, {
	fetchReposDataGithubAPI,
	fetchOrgsDataGithubAPI,
	fetchReposInOrg
})(withStyles(styles)(RepoList));
