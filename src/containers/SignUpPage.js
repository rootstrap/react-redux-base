import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import useSession from 'hooks/useSession';
import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

const SignUpPage = () => {
  const { authenticated } = useSession();
  const dispatch = useDispatch();

  const signUpRequest = useCallback(user => dispatch(signUp(user)), [dispatch]);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p>
        <FormattedMessage id="signup.title" />
      </p>
      <SignUpForm onSubmit={signUpRequest} />
      <Link to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </Link>
    </div>
  );
};

export default memo(SignUpPage);
