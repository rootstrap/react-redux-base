import * as types from 'actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  authenticated: false,
  user: null,
  info: {}
};

const actionHandlers = {
  [types.LOGIN_SUCCESS]: (state, { payload }) => {
    state.user = payload;
  },
  [types.SIGNUP_SUCCESS]: (state, { payload }) => {
    state.user = payload;
  },
  [types.UPDATE_SESSION]: (state, { payload }) => {
    state.info = payload;
    state.authenticated = true;
  },
  [types.LOGOUT_SUCCESS]: () => initialState
};

export default createReducer(initialState, actionHandlers);
