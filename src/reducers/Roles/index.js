import {
    ROLES_REQUEST,
    ROLES_FAIL,
    ROLES_SUCCESS,
    DELETE_ROLE_SUCCESS,
    CURRENT_ROLE_REQUEST,
    CURRENT_ROLE_SUCCESS,
    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS,
    EDIT_ROLE_REQUEST,
    EDIT_ROLE_SUCCESS
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
                list: newList
            };
        }

        case CURRENT_ROLE_REQUEST:
            return {
                ...state,
                currentRole: null
            };

        case CURRENT_ROLE_SUCCESS:
            return {
                ...state,
                currentRole: action.payload.currentRole
            };

        case CREATE_ROLE_REQUEST:
            return {
                ...state,
                createdRole: false
            };

        case CREATE_ROLE_SUCCESS:
            return {
                ...state,
                createdRole: action.payload.role
            };

        case EDIT_ROLE_REQUEST:
            return {
                ...state,
                editedRole: false
            };

        case EDIT_ROLE_SUCCESS:
            return {
                ...state,
                editedRole: action.payload.role
            };

        default:
            return state
    }
}