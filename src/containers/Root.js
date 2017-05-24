// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const Root = ({ store, history, routes, render }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} render={render}/>
  </Provider>
);

const { object, func } = PropTypes;

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
  routes: object.isRequired,
  render: func.isRequired
};

export default Root;
