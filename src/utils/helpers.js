import { Iterable } from 'immutable';

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
