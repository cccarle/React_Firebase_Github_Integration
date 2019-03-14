import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutUser, showRepositories, showNotification, showOrganizations, fetchNotifications } from '../../actions';
import _ from 'lodash';

// Styles
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SideNav from '../SideNav/SideNav';
import styles from './Navbar.style';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

class Navbar extends Component {

	componentWillMount() {
		this.props.fetchNotifications();
	}
	signOutAttempt = () => {
		this.props.signOutUser();
	};

	toggelNotification = () => {
		this.props.showNotification();
		this.setState({ counter: 0 })
	};

	checkMessagesLength = () => {

		console.log(this.props.notifications)
		// if (messages.length > 0) {

		// 	let len = messages.length
		// 	console.log(len)
		// 	this.setState({ counter: 2 })
		// }

		//this.setState({ counter: messages })
		//return this.state.counter
	}

	toggelRepositories = () => {
		this.props.showRepositories();
	};

	toggelOrganizations = () => {
		this.props.showOrganizations();
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar color="primary" className={classes.navbarColor} position="static">
					<Toolbar>
						<div>
							<Typography className={classes.grow} variant="h6" color="inherit">
								Github Dashboard
							</Typography>
						</div>
						<SideNav />

						<div className={classes.ButtonContainer}>
							<Button onClick={this.toggelOrganizations} color="inherit">
								Organizations
							</Button>
							<Button onClick={this.toggelRepositories} color="inherit">
								Repositories
							</Button>

							<Button onClick={this.signOutAttempt} color="inherit">
								Sign out
							</Button>
							<Badge
								className={classes.margin}
								onClick={this.toggelNotification}
								badgeContent={this.props.notifications.length}
								color="secondary"
							>
								<MailIcon />
							</Badge>
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
	fetchNotifications
})(withStyles(styles)(Navbar));
