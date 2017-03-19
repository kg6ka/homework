import {
    CUSTOMERS_REQUEST,
    CUSTOMERS_SUCCESS,
    CUSTOMERS_FAIL,
    BLOCK_CUSTOMER_REQUEST,
    BLOCK_CUSTOMER_SUCCESS,
    BLOCK_CUSTOMER_FAIL,
    REINVITE_CUSTOMER_REQUEST,
    REINVITE_CUSTOMER_SUCCESS,
    REINVITE_CUSTOMER_FAIL,
    CREATE_CUSTOMER_REQUEST,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAIL
} from '../../constants/Customers';

const initialState = {
    list: [],
    reInvite: false,
    createdCustomer: false,
    updatedCustomer: false
};

export default function customerState(state = initialState, action) {

    switch (action.type) {
        /**
         * All customers request
         */
        case CUSTOMERS_REQUEST:
            return { ...state,
                list: []
            };

        case CUSTOMERS_SUCCESS:
            return {...state,
                list: action.payload.list
            };

        case CUSTOMERS_FAIL:
            return { ...state,
                list: []
            };

        /**
         * Block customer
         */
        case BLOCK_CUSTOMER_REQUEST:
            return { ...state};

        case BLOCK_CUSTOMER_SUCCESS: {
            const updatedList = state.list.map(item => {
                item.block = item.id === action.payload.id && !action.payload.action;
                return item;
            });
            return {...state,
                list: updatedList
            };
        }

        case BLOCK_CUSTOMER_FAIL:
            return { ...state,
                list: []
            };

        /**
         * ReInvite customer
         */
        case REINVITE_CUSTOMER_REQUEST:
            return { ...state,
                reInvite: false
            };

        case REINVITE_CUSTOMER_SUCCESS:
            return {...state,
                reInvite: true
            };

        case REINVITE_CUSTOMER_FAIL:
            return { ...state,
                reInvite: false
            };

        /**
         * Create customers request
         */
        case CREATE_CUSTOMER_REQUEST:
            return { ...state,
                createdCustomer: false,
                done: true
            };

        case CREATE_CUSTOMER_SUCCESS:
            return {...state,
                createdCustomer: true,
                done: false
            };

        case CREATE_CUSTOMER_FAIL:
            return { ...state,
                createdCustomer: false,
                done: false
            };

        /**
         * Update customers request
         */
        case UPDATE_CUSTOMER_REQUEST:
            return { ...state,
                updatedCustomer: false,
                done: true
            };

        case UPDATE_CUSTOMER_SUCCESS:
            return {...state,
                updatedCustomer: true,
                done: false
            };

        case UPDATE_CUSTOMER_FAIL:
            return { ...state,
                updatedCustomer: false,
                done: false
            };

        default:
            return state
    }
}
