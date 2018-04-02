// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';

addLocaleData([...en, ...fr, ...es]);
const usersLocale = navigator.language;

const Root = ({ store, history, routes, render }) => (
  <IntlProvider
    locale={usersLocale}
    messages={translationsForUsersLocale}
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
