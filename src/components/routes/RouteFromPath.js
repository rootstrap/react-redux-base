import React from 'react';
import { Route } from 'react-router-dom';
import { node } from 'prop-types';

import PrivateRoute from './PrivateRoute';

const RouteFromPath = ({ component, ...route }) =>
  route.private ? (
    <PrivateRoute {...route}>{component}</PrivateRoute>
  ) : (
    <Route {...route}>{component}</Route>
  );

RouteFromPath.propTypes = {
  component: node.isRequired
};

export default RouteFromPath;
