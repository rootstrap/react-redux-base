import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { useSession } from 'react-session-persist';

import RouteFromPath from 'components/routes/RouteFromPath';
import Header from 'components/common/Header';
import routes from '../src/routes';
import theme from '../src/constants/theme';

const App = () => {
  const { authenticated } = useSession();

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>RS React Redux Base</title>
        </Helmet>
        <Header />
        <Switch>
          {routes.map((route, index) => (
            <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
          ))}
        </Switch>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
