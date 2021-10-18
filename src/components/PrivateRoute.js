import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Login from './Login';
import PropTypes from 'prop-types';
// If user tries to visit any page directly via the address bar:
// Redirect users to the login page (and pass the route users were trying to visit the login component)
const PrivateRoute = ({component: Component, ...props}) => {
	const authUsers = () => {
		const {authUser} = props;
		return authUser !== null;
	};
 
	return (
		<Route {...props} render={(p) => (
			<Fragment>
				{authUsers() ? <Component {...p} /> : <Login/>}
     	</Fragment>
		)}/>
	)
};

PrivateRoute.propTypes = {
	dispatch: PropTypes.func.isRequired,
	authUser: PropTypes.string
};

function mapStateToProps({authUser}) {
	return {
		authUser
	}
}

export default connect(mapStateToProps)(PrivateRoute);