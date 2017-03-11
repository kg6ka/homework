import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux'

import { Router, browserHistory } from 'react-router';

import { routes } from './routes';

import './styles/style.css';
import './styles/common.scss';

const rootApp = document.getElementById('rootApp');
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <div className="root-app">
            <Router history={history} routes={routes} />
        </div>
    </Provider>,
    rootApp
);
