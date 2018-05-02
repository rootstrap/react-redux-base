import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { AppContainer } from 'react-hot-loader';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import configureStore from './store/configureStore';
import App from './components/App';
import locales from './locales';
import './styles/styles.scss';

require('./favicon.ico'); // Tell webpack to load favicon.ico

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

const store = configureStore();

sessionService.initSessionService(store);

const renderApp = (Component) => {
  render(
    <IntlProvider
      locale={usersLocale}
      messages={messages}
      defaultLocale="en"
    >
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>
    </IntlProvider>,
    document.getElementById('app')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
