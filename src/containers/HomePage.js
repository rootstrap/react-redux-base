import React from 'react';
import { FormattedMessage } from 'react-intl';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import LogoutButton from 'components/user/LogoutButton';
import { getUser } from 'selectors/sessionSelectors';

const HomePage = ({ user }) => (
  <div>
    <p><FormattedMessage id="home.welcome" values={user} /></p>
    <LogoutButton />
  </div>
);

HomePage.propTypes = {
  user: object
};

const mapState = state => ({
  user: getUser(state)
});

export default connect(mapState)(HomePage);
