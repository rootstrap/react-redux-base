import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/session/LoginForm'; // eslint-disable-line import/no-named-as-default
import { routes } from '../constants/routesPaths';

const LoginPage = ({ actions: { login } }) => (
  <div>
    <p>LOGIN</p>
    <LoginForm onSubmit={login} />
    <Link to={routes.signUp}> Sign up </Link>
  </div>
);

const { object } = PropTypes;

LoginPage.propTypes = {
  actions: object.isRequired
};

const mapDispatch = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(null, mapDispatch)(LoginPage);
