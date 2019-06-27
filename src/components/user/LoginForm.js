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
import { loginSchema } from 'utils/constraints';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export const LoginForm = ({ isSubmitting, intl }) => (
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
    <button type="submit">
      <FormattedMessage id="login.form.submit" />
    </button>
    {isSubmitting && <Loading />}
  </Form>
);

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  isSubmitting: bool,
};

export default injectIntl(memo(withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.handleSubmit(values, setErrors, setSubmitting);
  },
  validationSchema: loginSchema,
  initialValues: {
    email: '',
    password: ''
  }
})(LoginForm)));
