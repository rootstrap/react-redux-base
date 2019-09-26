import React from 'react';
import { Link, matchPath } from 'react-router-dom';
import { array, string } from 'prop-types';

import routes from '../../routes';

const findComponentForRoute = (path, routes) => {
  const matchingRoute = routes.find(route =>
    matchPath(path, {
      path: route.path,
      exact: route.exact
    })
  );

  return matchingRoute ? matchingRoute.component : null;
};

const preloadRouteComponent = (to, onPreloadPromises) => {
  const component = findComponentForRoute(to, routes);

  if (component && component.preload) {
    component.preload();

    if (onPreloadPromises) {
      return Promise.all(onPreloadPromises.map(promise => promise()));
    }
  }
};

const PreloadLink = ({ to, onPreloadPromises, ...rest }) => {
  return (
    <Link to={to} onMouseEnter={() => preloadRouteComponent(to, onPreloadPromises)} {...rest} />
  );
};

PreloadLink.propTypes = {
  to: string,
  onPreloadPromises: array
};

export default PreloadLink;
