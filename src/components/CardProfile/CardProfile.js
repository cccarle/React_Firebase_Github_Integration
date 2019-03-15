import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserDataFromGithubAPI } from '../../actions';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// Styles
import styles from './CardProfile.style';

class CardProfile extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};


	getTimeAndDate = () => {
		let time = new Date().toLocaleString();
		return time
	}

	getFirstLetter = (name) => {
		if (name != undefined) {
			return name.slice(0, 1)
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="Recipe" className={classes.avatar}>
							{this.getFirstLetter(this.props.profile.name)}
						</Avatar>
					}

					title={this.props.profile.login}
					subheader={this.getTimeAndDate()}
				/>
				<CardMedia
					className={classes.media}
					image={this.props.profile.avatar_url}
					title="Avatar"
				/>
				<CardContent>
				</CardContent>
				<CardActions className={classes.actions} disableActionSpacing>
					<IconButton aria-label="Add to favorites">
						<FavoriteIcon />
					</IconButton>
				</CardActions>

			</Card>
		);
	}
}










CardProfile.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

	return state
};
export default connect(mapStateToProps, { fetchUserDataFromGithubAPI })(withStyles(styles)(CardProfile));
