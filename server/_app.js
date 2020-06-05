import React from 'react';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSession } from 'hooks';

import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../src/routes';

const App = () => {
  const { authenticated } = useSession();

  return (
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
  );
};

export default App;
