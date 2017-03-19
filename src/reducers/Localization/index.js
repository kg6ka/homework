import {
    LOCALIZATION_REQUEST,
    LOCALIZATION_SUCCESS,
    LOCALIZATION_SET,
    LOCALIZATION_FAIL
} from '../../constants/Localization';

const initialState = JSON.parse(window.localStorage.getItem('localization')) || {};

export default function localizationState(state = initialState, action) {

    switch (action.type) {

        case LOCALIZATION_REQUEST:
            // TODO
            return state;

        case LOCALIZATION_SUCCESS:
            // TODO
            return {...action.payload};

        case LOCALIZATION_FAIL:
            // TODO
            return state;

        case LOCALIZATION_SET:
            // TODO
            return {...action.payload};

        default:
            return state
    }
}
