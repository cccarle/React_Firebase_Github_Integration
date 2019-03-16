import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInUser, checkIfUserIsLoggedIn } from '../actions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Main.style';

class Main extends React.Component {
	componentDidMount() {
		this.props.checkIfUserIsLoggedIn()
	}

	signInAttempt = () => {
		this.props.signInUser()
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.containerStyle}>
				<Typography component="h2" variant="h2" gutterBottom>
					Welcome To Guthub Dashboard
				</Typography>
				<Typography className={classes.underText} component="h2" variant="overline" gutterBottom>
				never miss a commit or issue again  

			</Typography>
				<div>
					<Button onClick={this.signInAttempt} color="primary" size="large" variant="outlined">
						Log in{' '}
					</Button>
				</div>
			</div>
		)
	}
}

Main.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(null, { signInUser, checkIfUserIsLoggedIn })(withStyles(styles)(Main));
