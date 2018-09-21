import React from 'react';
import { FormattedMessage } from 'react-intl';

import LogoutButton from 'components/user/LogoutButton';

const HomePage = () => (
  <div>
    <p><FormattedMessage id="home.welcome" /></p>
    <LogoutButton />
  </div>
);

export default HomePage;
