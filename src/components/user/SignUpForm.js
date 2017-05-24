import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

const SignUpForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
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
    <div>
      <Field
        name="passwordConfirmation"
        label="Password confirmation"
        component={Input}
        type="password"
      />
    </div>
    <button type="submit">Submit</button>
  </form>
);

const { func, string } = PropTypes;

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'signUp',
  validate: constraints.validations(constraints.signUp)
})(SignUpForm);
