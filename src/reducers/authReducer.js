import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOGOUT_SENT:
    case types.SIGN_UP_SENT:
    case types.LOGIN_SENT: {
      return { ...state, loading: true };
    }

    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
    case types.SIGN_UP_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.SIGN_UP_FAILURE:
    case types.LOGIN_FAILURE: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

export default authReducer;
