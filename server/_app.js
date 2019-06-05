import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../src/routes';
import theme from '../src/constants/theme';

const App = ({ authenticated, checked }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Helmet>
        <title>RS React Redux Base</title>
      </Helmet>
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
    </Fragment>
  </ThemeProvider>
);

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = state => ({
  checked: state.session.checked,
  authenticated: state.session.authenticated,
});

export default connect(mapState)(App);
