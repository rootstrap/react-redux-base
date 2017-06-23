// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Iterable } from 'immutable';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import _ from 'lodash';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, { type }) => !_.startsWith(type, '@@router') && !_.startsWith(type, '@@redux-form'),
    stateTransformer: (state) => {
      const newState = {};

      Object.keys(state).forEach((i) => {
        newState[i] = Iterable.isIterable(state[i]) ? state[i].toJS() : state[i];
      });

      return newState;
    }
  });

  const middewares = [
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    logger
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
