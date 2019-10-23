import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';

import LogoutButton from 'components/user/LogoutButton';

const HomePage = () => {
  const { user } = useSession();

  return (
    <div>
      {user && user.email && (
        <p>
          <FormattedMessage id="home.welcome" values={user} />
        </p>
      )}
      <LogoutButton />
    </div>
  );
};

export default HomePage;
