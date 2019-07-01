import React, { memo } from 'react';
import { func } from 'prop-types';
import { Field, Form } from 'formik';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export const LoginForm = ({ isSubmitting, status, intl }) => (
  <Form>
    { status && <strong>{status}</strong> }
    <Field
      name="email"
      label={intl.formatMessage(messages.email)}
      component={Input}
      type="email"
    />
    <Field
      name="password"
      label={intl.formatMessage(messages.password)}
      component={Input}
      type="password"
    />
    <button type="submit">
      <FormattedMessage id="login.form.submit" />
    </button>
    {isSubmitting && <Loading />}
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(memo(LoginForm));
