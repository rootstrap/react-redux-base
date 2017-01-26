import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/session/LoginForm';

export const LoginPage = ({ actions: { login } }) => (
  <div>
    <p>LOGIN</p>
    <LoginForm onSubmit={login}/>
    <Link to="sign-up"> Sign up </Link>
  </div>
);

const { object } = PropTypes;

LoginPage.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(LoginPage);
