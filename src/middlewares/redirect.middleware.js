import { browserHistory } from 'react-router'

import { ROUTING } from '../constants/Routing'

// ------------------------------------
// Middleware
//
// Fires if action.payload is Promise
// ---

const redirect = store => next => action => { //eslint-disable-line no-unused-vars
    if (action.type === ROUTING) {
        browserHistory[action.payload.method](action.payload.nextUrl)
    }

    return next(action)
};

export default redirect;