import React from 'react';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { useSession } from 'hooks';

import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../src/routes';
import theme from '../src/constants/theme';

const App = () => {
  const { authenticated } = useSession();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>RS React Redux Base</title>
        </Helmet>
        <Switch>
          {routes.map((route, index) => (
            <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
          ))}
        </Switch>
      </>
    </ThemeProvider>
  );
};

export default App;
