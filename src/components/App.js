import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import history from 'utils/history';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';
import theme from '../constants/theme';

const App = ({ authenticated, checked }) => {
  window.history = history;
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>RS React Redux Base</title>
        </Helmet>
        <ConnectedRouter history={history}>
          {checked &&
            <Switch>
              {routes.map((route, index) =>
                <RouteFromPath
                  key={`route${index}`}
                  {...route}
                  authenticated={authenticated}
                />)
              }
            </Switch>
          }
        </ConnectedRouter>
      </Fragment>
    </ThemeProvider>
  );
};

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = state => ({
  checked: state.getIn(['session', 'checked']),
  authenticated: state.getIn(['session', 'authenticated'])
});

export default connect(mapState)(App);
