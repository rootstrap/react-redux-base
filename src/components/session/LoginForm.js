import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  emailPresence: { id: 'login.form.email.presence' },
  emailInvalid: { id: 'login.form.email.invalid' },
  passwordPresence: { id: 'login.form.password.presence' },
});

export const LoginForm = ({ handleSubmit, error, intl }) => (
  <form onSubmit={handleSubmit}>
    {error && <strong>{error}</strong>}
    <div>
      <Field
        name="email"
        label={intl.formatMessage(messages.email)}
        component={Input}
        messages={messages}
        type="email"
      />
    </div>
    <div>
      <Field
        name="password"
        label={intl.formatMessage(messages.password)}
        component={Input}
        messages={messages}
        type="password"
      />
    </div>
    <button type="submit">
      <FormattedMessage id="login.form.submit" />
    </button>
  </form>
);

const { func, string } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login, { fullMessages: false })
})(injectIntl(LoginForm));
