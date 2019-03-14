import React from 'react';
import { connect } from 'react-redux';
import { } from '../../actions';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	root: {
		maxWidth: 860,
		marginTop: '3%',
		margin: 'auto',
		width: '80‰',
		textAlign: 'center',
		backgroundColor: theme.palette.background.paper
	},
	Button: {
		marginTop: 10,
		marginRight: 110
	}
});

class FolderList extends React.Component {

	renderIfNotification = (notifications) => {
		if (notifications.length === 0) {
			return (
				<Typography variant="overline" gutterBottom>
					No new notifications
				</Typography>
			);
		} else {
			return (
				<div key={notifications}>
					<Typography variant="overline" gutterBottom>
						Notifications
					</Typography>
					{notifications.map((notification) => (
						<List key={notification.eventURL}>
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
						</List>

					))}
				</div>
			);
		}
	};



	render() {
		const { classes } = this.props;
		console.log(this.props.notifications)

		return <div className={classes.root}>{this.renderIfNotification(this.props.notifications)}</div>;
	}
}

FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const notifications = _.map(state.notification, (val) => {
		return { ...val };
	});

	return { notifications };
};

export default connect(mapStateToProps, {})(withStyles(styles)(FolderList));
