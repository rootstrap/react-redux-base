import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { sessionReducer as session } from 'redux-react-session';

import router from './routerReducer';

const rootReducer = combineReducers({
  form,
  session,
  router,
});

export default rootReducer;
