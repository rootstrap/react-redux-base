import React, { PureComponent } from 'react';
import { func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, signUp } from 'utils/constraints';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' }
});

class SignUpForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { handleSubmit, submitting, intl } = this.props;

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
        {submitting && <Loading />}
      </form>
    );
  }
}

export default reduxForm({
  form: 'signUp',
  validate: validations(signUp, { fullMessages: false })
})(injectIntl(SignUpForm));
