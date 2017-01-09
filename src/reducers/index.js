import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from './sessionReducer';
import signUp from './signUpReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  session,
  signUp
});

export default rootReducer;
