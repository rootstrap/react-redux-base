import React, { memo } from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, signUp } from 'utils/constraints';
import { useLoading } from 'hooks';
import { SIGNUP } from 'actions/actionTypes';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' }
});

export const SignUpForm = ({ handleSubmit }) => {
  const intl = useIntl();
  const loading = useLoading(SIGNUP);

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <Field
          name="passwordConfirmation"
          label={intl.formatMessage(messages.passConfirmation)}
          component={Input}
          type="password"
        />
      </div>
      <button type="submit">
        <FormattedMessage id="login.form.submit" />
      </button>
      {loading && <Loading />}
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: func.isRequired
};

export default reduxForm({
  form: 'signUp',
  validate: validations(signUp, { fullMessages: false })
})(memo(SignUpForm));
