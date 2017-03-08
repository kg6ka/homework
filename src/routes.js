import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainApp from './containers/MainApp';
import LoginPage from './containers/LoginPage';
import NotFoundRoute from './containers/NotFoundRoute';

import Promo from './components/Promo';
import Catalog from './components/Catalog';
import Categories from './components/Categories';

import requireAuthentication from './components/shared/AuthenticatedComponent';

export const routes = (
    <div>
        <Route path='/' component={requireAuthentication(MainApp)}>
            <IndexRoute component={requireAuthentication(Promo)}/>
            <Route path='catalogs'>
                <IndexRoute component={requireAuthentication(Catalog)}/>
                <Route path=':categories' component={requireAuthentication(Categories)} />
            </Route>
            <Route path='my-catalogs'>
                <IndexRoute component={requireAuthentication(Catalog)}/>
                <Route path=':categories' component={requireAuthentication(Categories)} />
            </Route>
        </Route>
        <Route path='login' component={LoginPage}/>
        <Route path='*' component={requireAuthentication(NotFoundRoute)} />
    </div>
);
