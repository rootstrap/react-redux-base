import React from 'react';
import { FormattedMessage } from 'react-intl';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import LogoutButton from 'components/user/LogoutButton';

const HomePage = ({ user }) => (
  <div>
    {user && user.email &&
      <p><FormattedMessage id="home.welcome" values={user} /></p>
    }
    <LogoutButton />
  </div>
);

HomePage.propTypes = {
  user: object
};

const mapState = state => ({
  user: state.session.user
});

export default connect(mapState)(HomePage);
