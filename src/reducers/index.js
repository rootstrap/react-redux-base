import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import session from './sessionReducer';

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
  whitelist: ['authenticated', 'info', 'user'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = history =>
  combineReducers({
    form,
    session: persistReducer(sessionPersistConfig, session),
    router: connectRouter(history)
  });

export default rootReducer;
