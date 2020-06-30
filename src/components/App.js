import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useSession } from 'hooks';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';
import Header from './common/Header';

const App = () => {
  const { authenticated } = useSession();

  return (
    <>
      <Helmet>
        <title>RS React Redux Base</title>
      </Helmet>
      <Header />
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => (
            <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
          ))}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
