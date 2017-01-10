import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as sessionActions from '../../actions/sessionActions';

class LogoutButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.success && browserHistory.replace('/login');
  }

  onClick() {
    const { logout } = this.props.actions;
    logout();
  }

  render() {
    return (
      <button onClick={this.onClick}>
        LOGOUT
      </button>
    );
  }
}

const { object } = PropTypes;

LogoutButton.propTypes = {
  actions: object.isRequired
};

const mapState = (state) => ({ success: state.session.logoutSuccess });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(LogoutButton);
