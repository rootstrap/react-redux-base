import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import locales from '../locales';

const messages = locales.en;

export const withStore = (WrappedComponent, store) => (
  <IntlProvider locale="en" messages={messages}>
    <Provider store={store}>
      {WrappedComponent}
    </Provider>
  </IntlProvider>
);
