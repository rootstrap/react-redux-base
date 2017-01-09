import * as types from '../actions/actionTypes';
import initialState from './initialState';

const signUpReducer = (state = initialState.session, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS: {
      return { signUpSuccess: true };
    }
    default: {
      return state;
    }
  }
};

export default signUpReducer;
