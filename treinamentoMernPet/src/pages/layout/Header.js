import React from 'react';
import {
	Link
}
from 'react-router';
import {
	LoginLink,
	LogoutLink,
	Authenticated,
	NotAuthenticated
}
from 'react-stormpath';

export default class Header extends React.Component {
	render() {
		return (
			<div className="ui secondary pointing menu">
				<Link to="/" className="item" activeClassName="active">Home</Link>

				<Authenticated>
					<div className="right menu">
						<Link to="/submit" className="item" activeClassName="active">Submit New Issue</Link>
						<LogoutLink className="item" />
					</div>
				</Authenticated>

				<NotAuthenticated>
					<div className="right menu">
						<LoginLink className="item" activeClassName="active" />
						<Link to="/register" className="item" activeClassName="active">Create Account</Link>
					</div>
				</NotAuthenticated>
			</div>
		);
	}
}
