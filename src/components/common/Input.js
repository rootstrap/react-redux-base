import React from 'react';
import { string, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from '../../utils/helpers';

const Input = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...input} {...{ placeholder, type }} />
      {touched && error &&
        <span>
          <FormattedMessage
            id={parseInputErrors(error)}
            defaultMessage={parseInputErrors(error)}
          />
        </span>
      }
    </div>
  </div>
);

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  meta: object,
};

export default Input;
