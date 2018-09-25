import React, { PureComponent } from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, login } from 'utils/constraints';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export class LoginForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
    submitting: bool.isRequired,
    error: string
  }

  render() {
    const { handleSubmit, error, submitting, intl } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
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
        {submitting && <Loading />}
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate: validations(login, { fullMessages: false })
})(injectIntl(LoginForm));
