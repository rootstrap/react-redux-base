import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

export const parseInputErrors = error => {
  if (!error) {
    return;
  }
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const applyQueryParams = (url, params = {}) => {
  if (isEmpty(params)) {
    return url;
  }
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};
