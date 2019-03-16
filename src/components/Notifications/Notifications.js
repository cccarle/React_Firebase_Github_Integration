import React from 'react';
import { connect } from 'react-redux';
import { } from '../../actions';
import { currentLoggedInUserFirestoreReference, getCurrentLoggedInGithubID } from '../../utils/helpers'
import PropTypes from 'prop-types';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import styles from './Notifications.style';

class Notifications extends React.Component {


	clearNotifications = () => {
		console.log('clear noti')
	}

	renderIfNotification = (notifications, classes) => {
		if (notifications.length === 0) {
			return (
				<Typography variant="overline" gutterBottom>
					No new notifications
				</Typography>
			);
		} else {
			return (
				<div key={notifications}>

					<div className={classes.container}>
						<Typography className={classes.headline} variant="overline" gutterBottom>
							Notifications
						<div className={classes.delete} >
								<Tooltip title="Delete">
									<IconButton onClick={this.clearNotifications} aria-label="Delete">
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</div>
						</Typography>

					</div>

					{notifications.map((notification) => (
						<List key={notification.time}>
							<ListItem>
								<Avatar alt="" src={notification.avatar} ></Avatar>

								<ListItemText
									primary={notification.title}
									secondary={notification.body}
								/>
								<Typography variant="overline" gutterBottom>
									{notification.createdBy} issue on {notification.repositoryName}
								</Typography>

							</ListItem>

							<ListItem>

								<ListItemText
									primary=''
									secondary=''
								/>

								<Typography variant="overline" gutterBottom>
									{notification.time.slice(0, 24)}
								</Typography>


							</ListItem>

						</List>

					))}
				</div>
			);
		}
	};



	render() {
		const { classes } = this.props;
		console.log(this.props.notifications)

		return <div className={classes.root}>{this.renderIfNotification(this.props.notifications, classes)}</div>;
	}
}

Notifications.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const notifications = _.map(state.notification, (val) => {
		return { ...val };
	});

	return { notifications };
};

export default connect(mapStateToProps, {})(withStyles(styles)(Notifications));
