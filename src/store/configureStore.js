import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

// import { routerMiddleware, routerReducer } from 'react-router-redux';
// import { browserHistory } from 'react-router';

import { redirectMiddleware } from '../middlewares/redirect.middleware';
import { spinnerMiddleware } from '../middlewares/spinner.middleware';

import * as sideEffects from 'side-effects';

export default function configureStore() {
    // const logger = createLogger();
    //   const store = createStore(
    //     rootReducer,
    //     initState,
    //     applyMiddleware(redirect),
    //     applyMiddleware(thunk, logger),
    // );

    const store = compose(
        applyMiddleware(thunk),
        applyMiddleware(createLogger()),
        applyMiddleware(redirectMiddleware),
        // applyMiddleware(routerMiddleware(browserHistory)),
        applyMiddleware(spinnerMiddleware),
        applyMiddleware(sideEffects.toastrEffects),
        applyMiddleware(sideEffects.redirectEffect)
    )(createStore)(rootReducer);

    if(module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}
