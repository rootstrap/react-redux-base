import { combineReducers } from 'redux';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

import { statusReducer } from '@rootstrap/redux-tools';
import session from './sessionReducer';

export const sessionPersistConfig = {
  key: 'session',
  whitelist: ['authenticated', 'info', 'user'],
  stateReconciler: autoMergeLevel2
};

/*
  Cookies are used to store the session on SSR.
  Other reducers can be persisted only on localForage if needed.
*/

const cookiesSessionConfig = {
  ...sessionPersistConfig,
  storage: new CookieStorage(Cookies, {})
};

const localSessionConfig = {
  ...sessionPersistConfig,
  storage: localForage
};

const rootReducer = useCookies =>
  combineReducers({
    session: persistReducer(useCookies ? cookiesSessionConfig : localSessionConfig, session),
    statusReducer
  });

export default rootReducer;
