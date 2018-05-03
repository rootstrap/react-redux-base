import { fromJS } from 'immutable';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = fromJS({
  location: null
});

const routerReducer = (state = initialState, { type, payload } = {}) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', fromJS(payload));
  }
  return state;
};

export default routerReducer;
