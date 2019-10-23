import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import { useSession } from 'hooks';
import history from 'utils/history';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';
import theme from '../constants/theme';
import Header from './common/Header';

const App = () => {
  const { authenticated } = useSession();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>RS React Redux Base</title>
        </Helmet>
        <Header />
        <ConnectedRouter history={history}>
          <Switch>
            {routes.map((route, index) => (
              <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
            ))}
          </Switch>
        </ConnectedRouter>
      </>
    </ThemeProvider>
  );
};

export default App;
