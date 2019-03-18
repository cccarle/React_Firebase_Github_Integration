import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWebhook, deleteWebhook, deleteRepoFromSubscription } from '../../utils/helpers'
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
import styles from './SubscriptionList.style';

class SubscriptionList extends React.Component {

	turnOffNotification = (subscription) => {
		deleteWebhook(subscription)
		deleteRepoFromSubscription(subscription)
	};

	turnOnNotification = (subscription) => {
		addWebhook(subscription);
	};

	renderButton = (subscription, classes) => {
		if (subscription.active) {
			return (
				<Button
					onClick={() => this.turnOffNotification(subscription)}
					variant="contained"
					className={classes.button}
				>
					Unsubscribe
				</Button>
			);
		} else {
			return (
				<Button
					onClick={() => this.turnOnNotification(subscription)}
					variant="outlined"
					className={classes.button}
				>
					Subscribe
				</Button>
			);
		}
	};

	render() {
		const { classes } = this.props;
		console.log(this.props.subscription)
		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={classes.gridList}>
					<GridListTile key="header" cols={2} style={{ height: 'auto' }}>
						<ListHeader component="div">
							<div className={classes.hrContainer}>
								<Typography className={classes.headerText} variant="overline" gutterBottom>
									My Subscriptions
									<hr />
								</Typography>
							</div>
						</ListHeader>
					</GridListTile>
					{this.props.subscription.map((subscription) => (
						<GridListTile key={subscription.id}>
							<img src={subscription.avatarURL} alt={subscription.name} />
							<GridListTileBar
								title={subscription.name}
								subtitle={<span>owner: {subscription.owner}</span>}
								actionIcon={this.renderButton(subscription, classes)}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}

SubscriptionList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const subscription = _.map(state.subscription, (val) => {
		return { ...val };
	});

	return { subscription };
};

export default connect(mapStateToProps, {
})(withStyles(styles)(SubscriptionList));



