import React, { memo } from 'react';
import { func } from 'prop-types';
import { Formik, Field, Form } from 'formik';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { loginSchema } from 'utils/constraints';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export const LoginForm = ({ handleSubmit, intl }) => (
  <Formik
    onSubmit={
      (values, { setSubmitting, setStatus }) =>
        handleSubmit(values, setStatus, setSubmitting)
    }
    validationSchema={loginSchema}
    initialValues={{ email: '', password: '' }}
  >
    {({ isSubmitting, status }) => (
      <Form>
        { status && <strong>{status}</strong> }
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
        {isSubmitting && <Loading />}
      </Form>
    )}
  </Formik>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(memo(LoginForm));
