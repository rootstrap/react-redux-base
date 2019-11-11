import { getUsernameSuccess } from 'actions/testActions';
import createReducer from './createReducer';

const initialState = {
  name: null
};

const actionHandlers = {
  [getUsernameSuccess]: (state, { payload }) => {
    state.name = payload;
  }
};

export default createReducer(initialState, actionHandlers);
