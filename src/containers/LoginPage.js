import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.success && browserHistory.replace('/');
  }

  onSubmit(user) {
    const { login } = this.props.actions;
    login(user);
  }

  render() {
    return (
      <div>
        <p>LOGIN</p>
        <LoginForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

const { object } = PropTypes;

LoginPage.propTypes = {
  actions: object.isRequired
};

const mapState = (state) => ({ success: state.session.loginSuccess });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(LoginPage);
