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
import { signUpSchema } from 'utils/constraints';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' }
});

export const SignUpForm = ({ handleSubmit, intl }) => (
  <Formik
    onSubmit={
      (values, { setSubmitting, setErrors }) =>
        handleSubmit(values, setErrors, setSubmitting)
    }
    validationSchema={signUpSchema}
    initialValues={{ email: '', password: '', passwordConfirmation: '' }}
  >
    {({ isSubmitting }) => (
      <Form>
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
        {isSubmitting && <Loading />}
      </Form>
    )}
  </Formik>
);

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(memo(SignUpForm));
