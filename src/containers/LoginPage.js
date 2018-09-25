import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/sessionActions';
import routes from 'constants/routesPaths';

class LoginPage extends PureComponent {
  static propTypes = {
    login: func.isRequired,
    authenticated: bool.isRequired,
  }

  render() {
    const { login, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <div>
        <p><FormattedMessage id="login.title" /></p>
        <LoginForm onSubmit={login} />
        <Link to={routes.signUp}>
          <FormattedMessage id="login.signup" />
        </Link>
      </div>
    );
  }
}

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user.toJS()))
});

export default connect(mapState, mapDispatch)(LoginPage);
