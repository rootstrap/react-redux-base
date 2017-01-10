import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <strong>{error}</strong>}
      <div>
        <Field
          name="email"
          label="Email"
          component={Input}
          type="email"
        />
      </div>
      <div>
        <Field
          name="password"
          label="Password"
          component={Input}
          type="password"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const { func, string } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login)
})(LoginForm);
