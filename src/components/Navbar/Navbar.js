import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutUser, showRepositories, showNotification, showOrganizations, showProfile, showSubscriptions } from '../../actions';
import _ from 'lodash';

// Styles
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './Navbar.style';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

class Navbar extends Component {

	signOutAttempt = () => {
		this.props.signOutUser();
	};

	toggelProfile = () => {
		this.props.showProfile()
	}

	toggelRepositories = () => {
		this.props.showRepositories();
	};

	toggelOrganizations = () => {
		this.props.showOrganizations();
	};

	toggelSubscriptions = () => {
		this.props.showSubscriptions();
	};

	toggelNotification = () => {
		this.props.showNotification()
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar color="primary" className={classes.navbarColor} position="static">
					<Toolbar>
						<div>
							<Typography className={classes.grow} variant="overline" color="inherit">
								Github Dashboard
							</Typography>
						</div>

						<div className={classes.ButtonContainer}>
							<Button onClick={this.toggelProfile} color="inherit">

								<Typography variant="overline" color="inherit">
									Profile
					</Typography>
							</Button>
							<Button onClick={this.toggelOrganizations} color="inherit">

								<Typography variant="overline" color="inherit">
									Organizations
							</Typography>
							</Button>
							<Button onClick={this.toggelRepositories} color="inherit">
								<Typography variant="overline" color="inherit">
									Repositories
						</Typography>
							</Button>

							<Button onClick={this.toggelSubscriptions} color="inherit">
								<Typography variant="overline" color="inherit">
									My Subscriptions
					</Typography>
							</Button>
							<Button onClick={this.toggelNotification} color="inherit">
								<Badge
									className={classes.margin}
									onClick={this.toggelNotification}
									badgeContent={this.props.notifications.length}
									color="secondary"
								>
									<MailIcon />
								</Badge>
							</Button>
							<Button onClick={this.signOutAttempt} color="inherit">
								<Typography variant="overline" color="inherit">
									Sign out
							</Typography>
							</Button>



						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const notifications = _.map(state.notification, (val) => {
		return { ...val };
	});

	return { notifications };
};

export default connect(mapStateToProps, {
	signOutUser,
	showRepositories,
	showNotification,
	showOrganizations,
	showSubscriptions,
	showProfile
})(withStyles(styles)(Navbar));
