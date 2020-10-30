import { createStore, compose, applyMiddleware } from 'redux';
import { thunkMiddleware } from '@rootstrap/redux-tools';
import { persistStore } from 'redux-persist';
import rootReducer from 'state/reducers';

export const configureStore = (initialState, server = false) => {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    rootReducer(true),
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  if (server) return { store };

  const persistor = persistStore(store);

  return { store, persistor };
};
