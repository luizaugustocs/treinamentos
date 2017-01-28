import React from 'react';
import DocumentTitle from 'react-document-title';
import {
	LoginForm
}
from 'react-stormpath';

export default class Login extends React.Component {
	render() {
		return (
			<DocumentTitle title={ 'Login' }>
				<LoginForm className="ui error form">
					<h1 className="ui dividing header">Login</h1>
					<div className="field">
						<label htmlFor="username">Username or Email</label>
						<input id="username" type="text" name="username" />
					</div>
					<div className="field">
						<label htmlFor="password">Password</label>
						<input id="password" type="password" name="password" />
					</div>
					<div data-spIf="form.error" className="ui error message">
						<div className="header">Error:</div>
						<p data-spBind="form.errorMessage" />
					</div>
					<button type="submit" className="ui button">Login</button>
				</LoginForm>
			</DocumentTitle>
		);
	}
}
