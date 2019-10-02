import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { sessionReducer as session } from 'redux-react-session';
import { connectRouter } from 'connected-react-router';
import actionStatus from 'reducers/statusReducer';


const rootReducer = history =>
  combineReducers({
    form,
    session,
    actionStatus,
    router: connectRouter(history)
  });

export default rootReducer;
