import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email"/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password"/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const { func } = PropTypes;

LoginForm.propTypes = { handleSubmit: func.isRequired };

export default reduxForm({ form: 'login' })(LoginForm);
