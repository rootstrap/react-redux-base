import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import useSession from 'hooks/useSession';
import { signUp } from 'actions/userActions';

import SignUpForm from 'components/user/SignUpForm';
import CustomFormik from 'components/common/CustomFormik';
import { signUpSchema } from 'utils/constraints';

import routes from 'constants/routesPaths';

const SignUpPage = () => {
  const { authenticated } = useSession();
  const dispatch = useDispatch();

  const signUpRequest = useCallback(
    (user, setStatus, setSubmitting) =>
      dispatch(signUp(user, setStatus, setSubmitting)),
    [dispatch]
  );

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div>
      <p><FormattedMessage id="signup.title" /></p>
      <CustomFormik
        component={SignUpForm}
        handleSubmit={signUpRequest}
        validationSchema={signUpSchema}
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
      />
      <Link to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </Link>
    </div>
  );
};

export default memo(SignUpPage);
