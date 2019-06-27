import React, { memo } from 'react';
import { bool } from 'prop-types';
import { withFormik, Field, Form } from 'formik';
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

export const SignUpForm = ({ intl, isSubmitting }) => (
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
);

SignUpForm.propTypes = {
  intl: intlShape.isRequired,
  isSubmitting: bool
};

export default injectIntl(memo(withFormik({
  mapPropsToValues: () => ({ email: '', password: '', passwordConfirmation: '' }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.handleSubmit(values, setErrors, setSubmitting);
  },
  validationSchema: signUpSchema,
  initialValues: {
    email: '',
    password: ''
  }
})(SignUpForm)));
