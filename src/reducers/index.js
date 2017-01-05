import { combineReducers } from 'redux';
import session from './sessionReducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  session,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
