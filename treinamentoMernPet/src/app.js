import React from 'react';
import ReactDOM from 'react-dom';
import {
	IndexRoute,
	Route,
	browserHistory
}
from 'react-router';
import ReactStormpath, {
	Router,
	HomeRoute,
	LoginRoute,
	AuthenticatedRoute
}
from 'react-stormpath';

import {
	Layout,
	Login,
	Register
}
from './pages';

ReactStormpath.init();

ReactDOM.render(
	(<Router history={ browserHistory }>
		<Route component={ Layout }>
			<HomeRoute path="/" >
				<IndexRoute />
			</HomeRoute>
			<LoginRoute path="/login" component={ Login } />
			<Route path="/register" component={ Register } />
		</Route>
	</Router>),
	document.getElementById('root')
);
