import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { getProfile } from 'actions/userActions';

class AboutPage extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    return (<div>test</div>);
  }
}

AboutPage.propTypes = {
  getProfile: func.isRequired
};

const mapDispatch = ({
  getProfile
});

export default connect(null, mapDispatch)(AboutPage);
