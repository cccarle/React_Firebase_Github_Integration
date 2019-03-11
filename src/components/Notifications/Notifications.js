import React from 'react';
import { connect } from 'react-redux';
import {} from '../../actions';
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
		maxWidth: 360,
		marginTop: '3%',
		margin: 'auto',
		width: '50‰',
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
				<div>
					{this.props.notifications.map((notification) => (
						<List key={notification.eventURL}>
							<ListItem>
								<Avatar>
									<ImageIcon />
								</Avatar>
								<ListItemText
									primary={notification.notification.title}
									secondary={notification.notification.body}
								/>
							</ListItem>
						</List>
					))}
					<Button color="outlined">clear notifications</Button>
				</div>
			);
		}
	};

	render() {
		const { classes } = this.props;

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
