import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    form,
    router: connectRouter(history)
  });

export default rootReducer;
