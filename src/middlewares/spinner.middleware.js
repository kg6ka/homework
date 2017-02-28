/*
 * Show spinner on each async request
 */
import  { startSpinner } from '../constants/Spinner';
import  { stopSpinner } from '../constants/Spinner';

// ------------------------------------
// Middleware
//
// Fires if action.payload is Promise
// ------------------------------------

const spinnerMiddleware = store => next => (action) => {
    const { payload } = action;
    if (
        (action) &&
        (typeof payload === 'object') &&
        (typeof payload.then === 'function')
    ) {
        console.log('REQUEST STARTED');
        store.dispatch({
            type: startSpinner,
        });
        payload
            .then(
                () => {
                    console.log('REQUEST ENDED');
                    store.dispatch({
                        type: stopSpinner,
                    });
                }, () => {
                    console.log('REQUEST ENDED WITH ERROR');
                    store.dispatch({
                        type: stopSpinner,
                    });
                },
            );
    }
    next(action);
};

export default spinnerMiddleware;