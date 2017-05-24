import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signUpActions from '../actions/signUpActions';
import SignUpForm from '../components/user/SignUpForm';

const SignUpPage = ({ actions: { signUp } }) => (
  <div>
    <p>SIGN UP</p>
    <SignUpForm onSubmit={signUp}/>
  </div>
);

const { object } = PropTypes;

SignUpPage.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(signUpActions, dispatch)
  };
};

export default connect(null, mapDispatch)(SignUpPage);
