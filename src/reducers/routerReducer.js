import { fromJS } from 'immutable';
import createReducer from './createReducer';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = fromJS({
  location: null,
});

const actionHandlers = {
  [LOCATION_CHANGE]: (state, action) => state.set('location', fromJS(action.payload)),
};

export default createReducer(initialState, actionHandlers);
