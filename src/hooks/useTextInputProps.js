import { useCallback } from 'react';

export default ({ handleValueChange, handleBlur, values, errors }) =>
  useCallback(
    fieldKey => ({
      value: values[fieldKey] || '',
      onChange: ({ target: { value } }) => handleValueChange(fieldKey, value),
      onBlur: () => handleBlur(fieldKey),
      errors: errors[fieldKey]
    }),
    [handleBlur, handleValueChange, values, errors]
  );
