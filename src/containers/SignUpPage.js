import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as signUpActions from '../actions/signUpActions';
import SignUpForm from '../components/user/SignUpForm';

class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.success && browserHistory.replace('/');
  }

  render() {
    const { signUp } = this.props.actions;

    return (
      <div>
        <p>SIGN UP</p>
        <SignUpForm onSubmit={signUp}/>
      </div>
    );
  }
}

const { object } = PropTypes;

SignUpPage.propTypes = {
  actions: object.isRequired
};

const mapState = ({ signUp }) => ({
  success: signUp.signUpSuccess
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(signUpActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(SignUpPage);
