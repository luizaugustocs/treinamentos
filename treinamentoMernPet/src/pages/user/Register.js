import React from 'react';
import DocumentTitle from 'react-document-title';
import {
	RegistrationForm,
	LoginLink
}
from 'react-stormpath';

export default class Register extends React.Component {
	render() {
		return (
			<DocumentTitle title={ 'Registration' }>
				<RegistrationForm className="ui error form">
					<h1 className="ui dividing header">Register</h1>
					
					<div data-spIf="account.created" className="ui info message">
						<p data-spIf="!account.enabled">To verify your account, click the verification link that we sent to your email then proceed to login by going to <LoginLink />.</p>
					</div>
					
					<div data-spIf="!account.created">
						<div className="field">
							<label htmlFor="firstName">First name</label>
							<input id="firstName" type="text" name="givenName" />
						</div>
						<div className="field">
							<label htmlFor="lastName">Last name</label>
							<input id="lastName" type="text" name="surname" />
						</div>
						<div className="field">
							<label htmlFor="email">Email</label>
							<input id="email" type="text" name="email" />
						</div>
						<div className="field">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password" />
						</div>
						
						<div data-spIf="form.error" className="ui error message">
							<div className="header">Error:</div>
							<p data-spBind="form.errorMessage" />
						</div>
						
						<button type="submit" className="ui button">Register</button>
					</div>
				</RegistrationForm>
			</DocumentTitle>
		);
	}
}
