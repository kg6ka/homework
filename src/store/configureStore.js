import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import { redirectMiddleware } from '../middlewares/redirect.middleware';
import { spinnerMiddleware } from '../middlewares/spinner.middleware';

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
        applyMiddleware(spinnerMiddleware)
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
