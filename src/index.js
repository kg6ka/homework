import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';

// import { Router, browserHistory } from 'react-router';

// import { routes } from './routes';

// import './styles/app.css';
// import commonStyles from './styles/common.scss'; //eslint-disable-line no-unused-vars

const rootApp = document.getElementById('rootApp');
console.log('rootApp');
// const store = configureStore();


render(
    <h1>RootApp</h1>,
    rootApp
);
// render(
//     <Provider store={store}>
//         <div className="app">
//             <Router history={browserHistory} routes={routes} />
//         </div>
//     </Provider>,
//     appBox
// );