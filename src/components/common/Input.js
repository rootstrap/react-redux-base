import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Input = ({ input,
  label,
  type,
  placeholder,
  messages,
  meta: { touched, error }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...input} {...{ placeholder, type }} />
      {touched && error &&
        <span>
          { messages ? <FormattedMessage {...messages[error]} /> : error}
        </span>
      }
    </div>
  </div>
);

const { string, object } = PropTypes;

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  meta: object,
  messages: object,
};

export default Input;
