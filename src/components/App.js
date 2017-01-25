// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';

class App extends Component {
  componentWillMount() {
    const { checkSession } = this.props.actions;
    checkSession();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const { object } = PropTypes;

App.propTypes = {
  children: object.isRequired,
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(App);
