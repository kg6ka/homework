import {
    PERMISSION_REQUEST,
    PERMISSION_FAIL,
    PERMISSION_SUCCESS
} from '../../constants/Permissions'

const initialState = {
    permissions: [],
    fetching: false
};

export default function permissionState(state = initialState, action) {

    switch (action.type) {

        case PERMISSION_REQUEST:
            return { ...state,
                permissions: [],
                fetching: true
            };

        case PERMISSION_SUCCESS:
            return {...state,
                list: action.payload.permissions,
                fetching: false
            };

        case PERMISSION_FAIL:
            return {...state,
                permissions: [],
                fetching: false
            };

        default:
            return state
    }
}