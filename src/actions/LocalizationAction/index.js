/*eslint-disable*/
import {
    LOCALIZATION_REQUEST,
    LOCALIZATION_SUCCESS,
    LOCALIZATION_SET,
    LOCALIZATION_FAIL
} from '../../constants/Localization';

export function localization_request() {
  return {
    type: LOCALIZATION_REQUEST
  }
}

export function localization_success(payload) {
  return {
    type: LOCALIZATION_SUCCESS,
    payload
  }
}

export function localization_fail() {
  return {
    type: LOCALIZATION_FAIL
  }
}

export function localization_set(payload) {
  return {
    type: LOCALIZATION_SET,
    payload
  }
}
/*eslint-enable*/
