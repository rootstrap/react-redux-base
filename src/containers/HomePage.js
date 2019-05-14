import React from 'react';
import { FormattedMessage } from 'react-intl';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoutButton from 'components/user/LogoutButton';
import { getUser } from 'selectors/sessionSelectors';
import routes from 'constants/routesPaths';

const HomePage = ({ user }) => (
  <div>
    {user && user.email &&
      <p><FormattedMessage id="home.welcome" values={user} /></p>
    }
    <LogoutButton />
    <Link to={routes.about}>About</Link>
  </div>
);

HomePage.propTypes = {
  user: object
};

const mapState = state => ({
  user: getUser(state)
});

export default connect(mapState)(HomePage);
