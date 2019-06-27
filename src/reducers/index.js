import { combineReducers } from 'redux';
import { sessionReducer as session } from 'redux-react-session';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  session,
  router: connectRouter(history),
});

export default rootReducer;
