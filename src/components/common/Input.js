import React from 'react';
import { string, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

const Input = ({
  field,
  label,
  type,
  placeholder,
  form: { errors, touched }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...field} {...{ placeholder, type }} />
      {touched[field.name] && errors && errors[field.name] &&
        <span>
          <FormattedMessage
            id={parseInputErrors(errors[field.name])}
            defaultMessage={parseInputErrors(errors[field.name])}
          />
        </span>
      }
    </div>
  </div>
);

Input.propTypes = {
  field: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  form: object,
};

export default Input;
