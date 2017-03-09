import {
    ROLES_REQUEST,
    ROLES_FAIL,
    ROLES_SUCCESS
} from '../../constants/Roles'

const initialState = {};

export default function rolesState(state = initialState, action) {

    switch (action.type) {

        case ROLES_REQUEST:
            return { ...state, fetching: true };

        case ROLES_SUCCESS:
            return {...state,
                roles: action.payload.roles,
                fetching: false
            };

        case ROLES_FAIL:
            return {...state,
                roles: [],
                fetching: false
            };

        default:
            return state
    }
}