import * as types from '../actions/actionTypes';
import initialState from './initialState';

const sessionReducer = (state = initialState.session, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      return { ...state, loginSuccess: true, logoutSuccess: false };
    }
    case types.LOGIN_ERROR: {
      return { ...state, loginError: action.response.error };
    }
    case types.LOGOUT_SUCCESS: {
      return { ...state, loginSuccess: false, logoutSuccess: true };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
