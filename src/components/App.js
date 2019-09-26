import React, { Fragment, Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import api from 'api';
import applyDefaultInterceptors from 'api/utils/applyDefaultInterceptors';
import useSession from 'hooks/useSession';
import history from 'utils/history';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';
import theme from '../constants/theme';
import Header from './common/Header';

applyDefaultInterceptors(api);

const App = () => {
  const { authenticated, checked } = useSession();

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>RS React Redux Base</title>
        </Helmet>
        <Header />
        <ConnectedRouter history={history}>
          {checked && (
            <Suspense fallback="Loading">
              <Switch>
                {routes.map((route, index) => (
                  <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
                ))}
              </Switch>
            </Suspense>
          )}
        </ConnectedRouter>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
