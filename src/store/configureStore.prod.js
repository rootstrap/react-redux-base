import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from 'reducers';
import history from 'utils/history';

export default function configureStore(initialState) {
  const middewares = [thunkMiddleware, routerMiddleware(history)];

  return createStore(rootReducer(history), initialState, compose(applyMiddleware(...middewares)));
}
