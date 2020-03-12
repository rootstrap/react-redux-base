import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useStatus, ERROR, LOADING } from '@rootstrap/redux-tools';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { login as loginValidations } from 'utils/constraints';
import { useForm, useValidation, useTextInputProps } from 'hooks';
import { login } from 'state/actions/userActions';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

const fields = {
  email: 'email',
  password: 'password'
};

export const LoginForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(login);
  const validator = useValidation(loginValidations);
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
          type="email"
          label={intl.formatMessage(messages.email)}
          {...inputProps(fields.email)}
        />
      </div>
      <div>
        <Input
          name="password"
          type="password"
          label={intl.formatMessage(messages.password)}
          {...inputProps(fields.password)}
        />
      </div>
      <button type="submit">
        <FormattedMessage id="login.form.submit" />
      </button>
      {status === LOADING && <Loading />}
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(LoginForm);
