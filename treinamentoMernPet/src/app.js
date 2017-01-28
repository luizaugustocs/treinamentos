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
    Register,
    List,
    Page
}
    from './pages';

ReactStormpath.init();

ReactDOM.render(
    (<Router history={ browserHistory }>
        <Route component={ Layout }>
            <HomeRoute path="/">
                <IndexRoute component={List}/>
            </HomeRoute>
            <Route path="/issue/:id" component={ Page }/>
            <LoginRoute path="/login" component={ Login }/>
            <Route path="/register" component={ Register }/>
        </Route>
    </Router>),
    document.getElementById('root')
);
