import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const RouteFromPath = route => (route.private ? <PrivateRoute {...route} /> : <Route {...route} />);

export default RouteFromPath;
