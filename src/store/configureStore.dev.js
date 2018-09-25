// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import _ from 'lodash';
import { routerMiddleware } from 'react-router-redux';

import history from 'utils/history';
import rootReducer from 'reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, { type }) => !_.startsWith(type, '@@router') && !_.startsWith(type, '@@redux-form'),
    stateTransformer: state => (Iterable.isIterable(state) ? state.toJS() : state)
  });

  const middewares = [
    thunkMiddleware,
    logger,
    routerMiddleware(history)
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
