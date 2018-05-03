import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';

import LoginForm from '../components/user/LoginForm';
import { login } from '../actions/sessionActions';
import { routes } from '../constants/routesPaths';

const LoginPage = ({ login, authenticated }) => {
  if (authenticated) {
    browserHistory.push(routes.index);
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
};

LoginPage.propTypes = {
  login: func.isRequired,
  authenticated: bool.isRequired,
};

const mapStateToProps = ({ session: { authenticated } }) => ({
  authenticated,
});

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatch)(LoginPage);
