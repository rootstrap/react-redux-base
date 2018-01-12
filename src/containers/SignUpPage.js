import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import * as signUpActions from '../actions/signUpActions';
import SignUpForm from '../components/user/SignUpForm';
import { routes } from '../constants/routesPaths';

const SignUpPage = ({ actions: { signUp }, authenticated }) => {
  if (authenticated) {
    browserHistory.push(routes.index);
  }
  return (
    <div>
      <p>SIGN UP</p>
      <SignUpForm onSubmit={signUp} />
      <Link to={routes.login}> Sign in </Link>
    </div>
  );
};

const { bool, object } = PropTypes;

SignUpPage.propTypes = {
  actions: object.isRequired,
  authenticated: bool.isRequired
};

const mapStateToProps = ({ session: { authenticated } }) => ({
  authenticated
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(signUpActions, dispatch)
});

export default connect(mapStateToProps, mapDispatch)(SignUpPage);
