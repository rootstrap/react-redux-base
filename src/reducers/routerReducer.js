import createReducer from './createReducer';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  location: null,
};

const actionHandlers = {
  [LOCATION_CHANGE]: (state, action) => { state.location = action.payload; },
};

export default createReducer(initialState, actionHandlers);
