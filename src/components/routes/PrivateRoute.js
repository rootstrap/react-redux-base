import React from 'react';
import { object, bool, string, func } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import routes from 'constants/routesPaths';

const PrivateRoute = ({ component, exact = false, path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      authenticated ?
        React.createElement(component, props) :
        <Redirect
          to={{
            pathname: routes.login,
            state: { from: props.location }
          }}
        />
    )}
  />
);

PrivateRoute.propTypes = {
  component: func.isRequired,
  path: string.isRequired,
  authenticated: bool.isRequired,
  exact: bool,
  location: object
};

export default PrivateRoute;
