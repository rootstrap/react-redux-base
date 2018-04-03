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
  passConfirmation: { id: 'signup.form.passconfirmation' },
  emailPresence: {
    id: 'login.form.email.presence',
    //defaultMessage: 'You must enter an email to continue'
  },
  emailInvalid: {
    id: 'login.form.email.invalid',
    //defaultMessage: 'You must enter a valid email'
  },
  passwordPresence: {
    id: 'login.form.password.presence',
    defaultMessage: 'You must enter a password to continue'
  },
  confirmationPresence: { id: 'signup.form.confirmation.presence' },
  confirmationEquality: { id: 'signup.form.confirmation.equality' },
});

const SignUpForm = ({ handleSubmit, intl }) => (
  <form onSubmit={handleSubmit}>
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
    <div>
      <Field
        name="passwordConfirmation"
        label={intl.formatMessage(messages.passConfirmation)}
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

const { func } = PropTypes;

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
};

export default reduxForm({
  form: 'signUp',
  validate: constraints.validations(constraints.signUp, { fullMessages: false })
})(injectIntl(SignUpForm));
