// import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import has from 'lodash/has';

import {
  CREATE_ROLE_SUCCESS,
  EDIT_ROLE_SUCCESS
} from '../constants';

export default function redirectEffect( {dispatch} ) {
  return next => (action) => {
    const result = next(action);

    switch (action.type) {
      case CREATE_ROLE_SUCCESS:
      case EDIT_ROLE_SUCCESS: {
        const { payload: { role: { id } } } = action;
        dispatch(browserHistory.push(`/role-management/edit/${id}`));
        break;
      }
      default:
    }

    return result;
  };
}

