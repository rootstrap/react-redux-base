import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import includes from 'lodash/includes';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from 'state/store/configureStore';
import App from 'components/App';
import locales from 'locales';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from 'constants/constants';
import httpClient from 'httpClient';
import applyDefaultInterceptors from 'httpClient/applyDefaultInterceptors';
import 'styles/styles.scss';

require('../src/favicon.ico'); // Tell webpack to load favicon.ico

// Fix for browsers that don't implement Intl by default e.g.: Safari)
if (!window.Intl) {
  require.ensure(
    [
      '@formatjs/intl-relativetimeformat',
      '@formatjs/intl-relativetimeformat/dist/include-aliases.js',
      '@formatjs/intl-relativetimeformat/dist/locale-data/en.js',
      '@formatjs/intl-relativetimeformat/dist/locale-data/es.js'
    ],
    require => {
      require('@formatjs/intl-relativetimeformat/polyfill');
      require('@formatjs/intl-relativetimeformat/dist/include-aliases');
      require('@formatjs/intl-relativetimeformat/dist/locale-data/en.js');
      require('@formatjs/intl-relativetimeformat/dist/locale-data/es.js');
    }
  );
}

const usersLocale = navigator.language.split('-')[0];
const supportedUserLocale = includes(SUPPORTED_LANGUAGES, usersLocale);
const locale = supportedUserLocale ? usersLocale : DEFAULT_LANGUAGE;
const messages = locales[locale];

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const { persistor, store } = configureStore(preloadedState);

const renderApp = Component => {
  hydrate(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer>
            <Component />
          </AppContainer>
        </PersistGate>
      </Provider>
    </IntlProvider>,
    document.getElementById('app')
  );
};

applyDefaultInterceptors(store, httpClient);
renderApp(App);

if (module.hot) {
  module.hot.accept();
}
