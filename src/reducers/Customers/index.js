import {
    CUSTOMERS_REQUEST,
    CUSTOMERS_SUCCESS,
    CUSTOMERS_FAIL
} from '../../constants/Customers';

const initialState = {};

export default function customerState(state = initialState, action) {

    switch (action.type) {
        /**
         * All customers request
         */
        case CUSTOMERS_REQUEST:
            return state;

        case CUSTOMERS_SUCCESS:
            return {...action.payload};

        case CUSTOMERS_FAIL:
            return state;

        default:
            return state
    }
}
