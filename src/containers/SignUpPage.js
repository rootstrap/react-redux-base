import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import * as signUpActions from '../actions/signUpActions';
import SignUpForm from '../components/user/SignUpForm';
import { routes } from '../constants/routesPaths';
import Loading from '../components/common/Loading';

const SignUpPage = ({ actions: { signUp }, authenticated, loading }) => {
  if (authenticated) {
    browserHistory.push(routes.index);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <p><FormattedMessage id="signup.title" /></p>
      <SignUpForm onSubmit={signUp} />
      <Link to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </Link>
    </div>
  );
};

const { bool, object } = PropTypes;

SignUpPage.propTypes = {
  actions: object.isRequired,
  authenticated: bool.isRequired,
  loading: bool.isRequired,
};

const mapStateToProps = ({ session: { authenticated }, auth: { loading } }) => ({
  authenticated,
  loading,
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(signUpActions, dispatch)
});

export default connect(mapStateToProps, mapDispatch)(SignUpPage);
