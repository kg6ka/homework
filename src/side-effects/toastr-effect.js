import toastr from 'toastr';
import 'toastr/toastr.scss';

import get from 'lodash/get';

import * as c from '../constants';

toastr.options = {
  timeOut: 5000,
  closeButton: true,
  preventDuplicates: true
};

const success = message => toastr.success(message, 'Complete');
const error = (message, errorMsg) => toastr.error(message, errorMsg);

export default function toastrEffect() {
  return next => (action) => {
    const result = next(action);

    if (get(action.payload, 'error.status') === 403) {
      error('Action is not allowed', action.payload.error.statusText);
    }

    switch (action.type) {
      // Localization
      case c.LOCALIZATION_SUCCESS: {
        success(action.payload.LOGIN.notifyOptions);
        break;
      }
      default:
    }

    return result;
  };
}