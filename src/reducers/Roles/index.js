import {
    ROLES_REQUEST,
    ROLES_FAIL,
    ROLES_SUCCESS,
    DELETE_ROLE_SUCCESS
} from '../../constants/Roles'

const initialState = {
    list: [],
    fetching: false
};

export default function rolesState(state = initialState, action) {

    switch (action.type) {

        case ROLES_REQUEST:
            return { ...state,
                list: [],
                fetching: true
            };

        case ROLES_SUCCESS:
            return {...state,
                list: action.payload.list,
                fetching: false
            };

        case ROLES_FAIL:
            return {...state,
                list: [],
                fetching: false
            };

        case DELETE_ROLE_SUCCESS: {
            const newList = state.list.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                list: newList,
                fetching: false
            };
        }
        default:
            return state
    }
}