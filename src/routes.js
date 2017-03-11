import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainApp from './containers/MainApp';
import LoginPage from './containers/LoginPage';
import NotFoundRoute from './containers/NotFoundRoute';

import Promo from './components/Promo';
import Catalog from './components/Catalog';
import Categories from './components/Categories';
import Roles from './components/Roles';
import CreateRole from './components/CreateRole';
import EditRole from './components/EditRole';

import { requireAuthentication } from './components';
import { loginWrap } from './components';

export const routes = (
    <div>
        <Route path='/' component={requireAuthentication(MainApp)}>
            <IndexRoute component={requireAuthentication(Promo)}/>
            <Route path="role-management">
                <IndexRoute component={requireAuthentication(Roles)}/>
                <Route path='create' component={requireAuthentication(CreateRole)} />
                <Route path='edit' component={requireAuthentication(EditRole)} />
            </Route>
            <Route path='catalogs'>
                <IndexRoute component={requireAuthentication(Catalog)}/>
                <Route path=':categories' component={requireAuthentication(Categories)} />
            </Route>
            <Route path='my-catalogs'>
                <IndexRoute component={requireAuthentication(Catalog)}/>
                <Route path=':categories' component={requireAuthentication(Categories)} />
            </Route>
        </Route>
        <Route path='login' component={loginWrap(LoginPage)}/>
        <Route path='*' component={requireAuthentication(NotFoundRoute)} />
    </div>
);
