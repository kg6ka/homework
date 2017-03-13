import {
    PERMISSION_REQUEST,
    PERMISSION_FAIL,
    PERMISSION_SUCCESS,
    CURRENT_PERMISSION_REQUEST,
    CURRENT_PERMISSION_SUCCESS,
    CURRENT_PERMISSION_FAIL
} from '../../constants/Permissions'

const initialState = {
    list: [],
    fetching: false
};

export default function permissionState(state = initialState, action) {

    switch (action.type) {

        case PERMISSION_REQUEST:
            return { ...state,
                list: [],
                fetching: true
            };

        case PERMISSION_SUCCESS:
            return {...state,
                list: action.payload.list,
                fetching: false
            };

        case PERMISSION_FAIL:
            return {...state,
                list: [],
                fetching: false
            };


        case CURRENT_PERMISSION_REQUEST:
            return { ...state,
                currentList: [],
                fetching: true
            };

        case CURRENT_PERMISSION_SUCCESS:
            return {...state,
                currentList: action.payload.list,
                fetching: false
            };

        case CURRENT_PERMISSION_FAIL:
            return {...state,
                currentList: [],
                fetching: false
            };

        default:
            return state
    }
}