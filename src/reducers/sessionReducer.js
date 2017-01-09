import * as types from '../actions/actionTypes';
import initialState from './initialState';

const sessionReducer = (state = initialState.session, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      return { loginSuccess: true, logoutSuccess: false };
    }
    case types.LOGOUT_SUCCESS: {
      return { loginSuccess: false, logoutSuccess: true };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
