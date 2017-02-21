import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import { checkAuth } from './services/sessionService';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage'; // eslint-disable-line import/no-named-as-default
import SignUpPage from './containers/SignUpPage';
import { routes } from './constants/routesPaths';

export default (
  <Route path={routes.index} component={App}>
    <IndexRoute onEnter={checkAuth} component={HomePage} />
    <Route path={routes.login} component={LoginPage} />
    <Route path={routes.signUp} component={SignUpPage} />
  </Route>
);
