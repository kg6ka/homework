import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainApp from './containers/MainApp';
import LoginPage from './containers/LoginPage';
import NotFoundRoute from './containers/NotFoundRoute';

import Promo from './components/Promo';
import Catalog from './components/Catalog';
import Categories from './components/Categories';
import Roles from './components/Roles';
import CreateRole from './components/Roles/CreateRole';
import EditRole from './components/Roles/EditRole';
import Customers from './components/Customers';
import NewUser from './components/Customers/NewUser';

import { LocalizationComponents } from './components';
import { requireAuthentication } from './components';
import { requirePermissions } from './components';
import { loginWrap } from './components';

export const routes = (
    <Route component={LocalizationComponents}>
        <Route path='/' component={requireAuthentication(MainApp)}>
            <IndexRoute component={Promo}/>
            <Route path='role-management'>
                <IndexRoute component={Roles}/>
                <Route path='create' component={CreateRole} />
                <Route path='edit/:id' component={EditRole} />
            </Route>
            <Route path='user-management'>
                <IndexRoute component={Customers}/>
                <Route path='create' component={NewUser} />
                {/*<Route path='edit/:id' component={requireAuthentication(EditRole)} />*/}
            </Route>
            <Route path='catalogs'>
                <IndexRoute component={requirePermissions(Catalog, 'Admin')}/>
                <Route path=':categories' component={Categories} />
            </Route>
            <Route path='my-catalogs'>
                <IndexRoute component={Catalog}/>
                <Route path=':categories' component={Categories} />
            </Route>
        </Route>
        <Route path='login' component={loginWrap(LoginPage)}/>
        <Route path='*' component={requireAuthentication(NotFoundRoute)} />
    </Route>
);
