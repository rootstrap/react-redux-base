import { lazy } from 'react';

import routesPaths from 'constants/routesPaths';

const ReactLazyPreload = importStatement => {
  const Component = lazy(importStatement);
  Component.preload = importStatement;
  return Component;
};

const routes = [
  {
    path: routesPaths.index,
    component: ReactLazyPreload(() => import('pages/HomePage')),
    exact: true,
    private: true
  },
  {
    path: routesPaths.login,
    component: ReactLazyPreload(() => import('pages/LoginPage'))
  },
  {
    path: routesPaths.signUp,
    component: ReactLazyPreload(() => import('pages/SignUpPage'))
  },
  {
    component: ReactLazyPreload(() => import('pages/NotFoundPage'))
  }
];

export default routes;
