import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Promise from 'redux-promise';
import reducers from './reducers';
import PostList from './components/postList'
import PostCreate from './components/postCreate';

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>  {/* O Switch obriga a sair na primeira rota que der match */}
                    <Route path="/posts/new" component={PostCreate}/>
                    <Route path="/" component={PostList}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));
