import React, { useEffect } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

const Input = ({ label, name, value, onChange, errors, active, touched, ...props }) => {
  // Register field in the form
  useEffect(() => {
    onChange({ target: { value } }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input name={name} value={value} onChange={onChange} {...props} />
        {touched && errors && (
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
  value: string,
  onChange: func.isRequired,
  errors: arrayOf(string),
  active: bool.isRequired,
  touched: bool.isRequired
};

export default Input;
