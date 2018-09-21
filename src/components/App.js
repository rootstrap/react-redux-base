import React, { Fragment, PureComponent } from 'react';
import { bool } from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import history from 'utils/history';
import RouteFromPath from 'components/routes/RouteFromPath';
import routes from '../routes';

class App extends PureComponent {
  static propTypes = {
    authenticated: bool.isRequired,
    checked: bool.isRequired
  }

  render() {
    const { authenticated, checked } = this.props;

    return (
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
    );
  }
}

const mapState = state => ({
  checked: state.getIn(['session', 'checked']),
  authenticated: state.getIn(['session', 'authenticated'])
});

export default connect(mapState)(App);
