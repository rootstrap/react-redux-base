// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import locales from '../locales';

// Fix for browsers that don't implement Intl by default e.g.: Safari)
if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/es.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/es.js');
  });
}

addLocaleData([...en, ...es]);
const usersLocale = navigator.language.split('-')[0];
const messages = locales[usersLocale];

const Root = ({ store, history, routes, render }) => (
  <IntlProvider
    locale={usersLocale}
    messages={messages}
    defaultLocale="en"
  >
    <Provider store={store}>
      <Router history={history} routes={routes} render={render} />
    </Provider>
  </IntlProvider>
);

const { object, func } = PropTypes;

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
  routes: object.isRequired,
  render: func.isRequired
};

export default Root;
