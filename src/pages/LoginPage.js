import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import LoginForm from 'components/user/LoginForm';
import PreloadLink from 'components/routes/PreloadLink';
import { login } from 'actions/userActions';
import routes from 'constants/routesPaths';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p>
        <FormattedMessage id="login.title" />
      </p>
      <LoginForm onSubmit={loginRequest} />
      <PreloadLink to={routes.signUp}>
        <FormattedMessage id="login.signup" />
      </PreloadLink>
    </div>
  );
};

export default memo(LoginPage);
