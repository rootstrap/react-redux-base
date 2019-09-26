import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import PreloadLink from 'components/routes/PreloadLink';
import routes from 'constants/routesPaths';

const SignUpPage = () => {
  const { authenticated } = useSession();
  const signUpRequest = useDispatch(signUp);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p>
        <FormattedMessage id="signup.title" />
      </p>
      <SignUpForm onSubmit={signUpRequest} />
      <PreloadLink to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </PreloadLink>
    </div>
  );
};

export default memo(SignUpPage);
