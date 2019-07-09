import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { logout } from 'actions/sessionActions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutRequest = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <button onClick={logoutRequest}>
      <FormattedMessage id="logout.button" />
    </button>
  );
};

export default LogoutButton;
