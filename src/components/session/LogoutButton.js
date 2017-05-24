import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';

const LogoutButton = ({ actions: { logout } }) => (
  <button onClick={logout}>
    LOGOUT
  </button>
);

const { object } = PropTypes;

LogoutButton.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(LogoutButton);
