import * as types from '../actions/actionTypes';
import initialState from './initialState';

const sessionReducer = (state = initialState.session, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGN_UP_SUCCESS:
    case types.GET_SESSION_SUCCESS: {
      return { authenticated: true };
    }
    case types.LOGOUT_SUCCESS:
    case types.GET_SESSION_ERROR: {
      return { authenticated: false };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
