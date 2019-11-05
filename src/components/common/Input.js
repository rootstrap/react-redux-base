import React from 'react';
import { string, arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

const Input = ({ label, name, errors, ...props }) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input name={name} {...props} />
        {errors && (
          <span>
            <FormattedMessage
              id={parseInputErrors(errors)}
              defaultMessage={parseInputErrors(errors)}
            />
          </span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  name: string.isRequired,
  label: string,
  errors: arrayOf(string)
};

export default Input;
