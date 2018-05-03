import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  session: sessionReducer
});

export default rootReducer;
