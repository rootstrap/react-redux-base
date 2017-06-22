/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { AppContainer } from 'react-hot-loader';
import { sessionService } from 'redux-react-session';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import routes from './routes'; // eslint-disable-line import/no-named-as-default
import './styles/styles.scss';

require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

sessionService.initSessionService(store);

const appRoutes = routes;

const renderApp = (appRoutes) => {
  render(
    <AppContainer>
      <Root store={store} history={history} routes={appRoutes} render={applyRouterMiddleware(useScroll())} />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(appRoutes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp(appRoutes);
  });
}
