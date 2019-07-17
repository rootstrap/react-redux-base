import React, { Fragment } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import useSession from 'hooks/useSession';
import history from 'utils/history';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';
import theme from '../constants/theme';
import Header from './common/Header';

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
            <Switch>
              {routes.map((route, index) => (
                <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
              ))}
            </Switch>
          )}
        </ConnectedRouter>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
