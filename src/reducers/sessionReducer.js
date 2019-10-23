import * as types from 'actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  authenticated: false,
  user: null,
  info: {}
};

const actionHandlers = {
  [types.SAVE_SESSION]: (state, { payload }) => {
    state.info = payload;
    state.authenticated = true;
  },

  [types.SAVE_USER]: (state, { payload }) => {
    state.user = payload;
  },

  [types.REMOVE_DATA]: () => initialState
};

export default createReducer(initialState, actionHandlers);
