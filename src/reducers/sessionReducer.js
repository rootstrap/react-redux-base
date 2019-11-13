import { loginSuccess, signUpSuccess, logoutSuccess, updateSession } from 'actions/userActions';

import createReducer from './createReducer';

const initialState = {
  authenticated: false,
  user: null,
  info: {}
};

const actionHandlers = {
  [loginSuccess]: (state, { payload }) => {
    state.user = payload;
  },
  [signUpSuccess]: (state, { payload }) => {
    state.user = payload;
  },
  [updateSession]: (state, { payload }) => {
    state.info = payload;
    state.authenticated = true;
  },
  [logoutSuccess]: () => initialState
};

export default createReducer(initialState, actionHandlers);
