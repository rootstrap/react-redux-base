import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import locales from 'locales';
import theme from 'constants/theme';

const messages = locales.en;

export const withStore = (WrappedComponent, store) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <IntlProvider locale="en" messages={messages}>
        <Provider store={store}>{WrappedComponent}</Provider>
      </IntlProvider>
    </ThemeProvider>
  </MemoryRouter>
);
