import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import useSession from 'hooks/useSession';
import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/sessionActions';
import routes from 'constants/routesPaths';

const LoginPage = () => {
  const { authenticated } = useSession();
  const dispatch = useDispatch();
  const loginRequest = useCallback(
    user => dispatch(login(user)),
    [dispatch]
  );

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p><FormattedMessage id="login.title" /></p>
      <LoginForm onSubmit={loginRequest} />
      <Link to={routes.signUp}>
        <FormattedMessage id="login.signup" />
      </Link>
    </div>
  );
};

export default memo(LoginPage);
