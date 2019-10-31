import React, { memo } from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, login } from 'utils/constraints';
import { LOADING, ERROR } from 'constants/status';
import { useStatus } from 'hooks';
import { LOGIN } from 'actions/actionTypes';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export const LoginForm = ({ handleSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(LOGIN);

  return (
    <form onSubmit={handleSubmit}>
      {status === ERROR && <strong>{error}</strong>}
      <div>
        <Field
          name="email"
          label={intl.formatMessage(messages.email)}
          component={Input}
          type="email"
        />
      </div>
      <div>
        <Field
          name="password"
          label={intl.formatMessage(messages.password)}
          component={Input}
          type="password"
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
  handleSubmit: func.isRequired
};

export default reduxForm({
  form: 'login',
  validate: validations(login, { fullMessages: false })
})(memo(LoginForm));
