import { Iterable } from 'immutable';
import queryString from 'query-string';

export const parseInputErrors = (error) => {
  if (!error) {
    return;
  }
  if (Iterable.isIterable(error)) {
    return error.first();
  } else if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const applyQueryParams = (url, params) => {
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};
