import React, { PropTypes } from 'react';

const Input = ({ input, label, type, placeholder, meta: { touched, error } }) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...input} {...{ placeholder, type }}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const { string, object } = PropTypes;

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  meta: object
};

export default Input;
