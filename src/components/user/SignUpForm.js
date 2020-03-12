import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useStatus, ERROR, LOADING } from '@rootstrap/redux-tools';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { signUp as signUpValidations } from 'utils/constraints';
import { useForm, useValidation, useTextInputProps } from 'hooks';
import { signUp } from 'state/actions/userActions';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' }
});

const fields = {
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation'
};

export const SignUpForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(signUp);

  const validator = useValidation(signUpValidations);
  const { values, errors, handleValueChange, handleSubmit, handleBlur } = useForm(
    {
      onSubmit,
      validator,
      validateOnBlur: true
    },
    [onSubmit]
  );

  const inputProps = useTextInputProps({ handleValueChange, handleBlur, values, errors });

  return (
    <form onSubmit={handleSubmit}>
      {status === ERROR && <strong>{error}</strong>}
      <div>
        <Input
          name="email"
          label={intl.formatMessage(messages.email)}
          type="email"
          {...inputProps(fields.email)}
        />
      </div>
      <div>
        <Input
          name="password"
          label={intl.formatMessage(messages.password)}
          type="password"
          {...inputProps(fields.password)}
        />
      </div>
      <div>
        <Input
          name="passwordConfirmation"
          label={intl.formatMessage(messages.passConfirmation)}
          type="password"
          {...inputProps(fields.passwordConfirmation)}
        />
      </div>
      <button type="submit">
        <FormattedMessage id="login.form.submit" />
      </button>
      {status === LOADING && <Loading />}
    </form>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(SignUpForm);
