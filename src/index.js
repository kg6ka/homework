import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { Router, browserHistory } from 'react-router';

import { routes } from './routes';

import './styles/common.scss';

const rootApp = document.getElementById('rootApp');
const store = configureStore();

render(
    <Provider store={store}>
        <div className="root-app">
            <Router history={browserHistory} routes={routes} />
        </div>
    </Provider>,
    rootApp
);
