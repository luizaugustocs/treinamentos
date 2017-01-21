import React from 'react';

import ReactDOM from 'react-dom';

import {
    IndexRoute,
    Route,
    browserHistory
} from 'react-router';

import ReactStormPath, {
    Router,
    HomeRoute,
    LoginRoute,
    AuthenticatedRoute
} from 'react-stormpath';

import {Layout} from './pages';

ReactStormPath.init();

ReactDOM.render(
    (<Router history={browserHistory}>
        <Route component={ Layout}>
            <HomeRoute path="/">
                <IndexRoute />
            </HomeRoute>
        </Route>
    </Router>),
    document.getElementById('root')
)