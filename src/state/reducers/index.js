import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { statusReducer } from '@rootstrap/redux-tools';
import session from './sessionReducer';

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
  whitelist: ['authenticated', 'info', 'user'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = history =>
  combineReducers({
    session: persistReducer(sessionPersistConfig, session),
    router: connectRouter(history),
    actionStatus: statusReducer
  });

export default rootReducer;
