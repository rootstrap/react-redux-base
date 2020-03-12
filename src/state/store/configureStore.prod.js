import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { thunkMiddleware } from '@rootstrap/redux-tools';

import rootReducer from 'state/reducers';
import history from 'utils/history';

export default function configureStore(initialState, isServerSide = false) {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  if (isServerSide) {
    return { store };
  }

  const persistor = persistStore(store);

  return { store, persistor };
}
