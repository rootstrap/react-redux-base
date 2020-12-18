import { createReducer } from '@reduxjs/toolkit';

import { FULFILLED, REJECTED, PENDING, RESET } from 'constants/actionStatusConstants';

const DELIMITER = '/';

const getActionKey = type => {
  type = type.split(DELIMITER);
  type.pop();
  return type.join(DELIMITER);
};

export default createReducer({}, builder => {
  builder
    .addMatcher(
      ({ type }) => type.endsWith(`/${REJECTED}`),
      (state, { type, error }) => {
        state[getActionKey(type)] = { status: REJECTED, error: error?.message };
      }
    )
    .addMatcher(
      ({ type }) => type.endsWith(`/${FULFILLED}`),
      (state, { type }) => {
        state[getActionKey(type)] = { status: FULFILLED };
      }
    )
    .addMatcher(
      ({ type }) => type.endsWith(`/${PENDING}`),
      (state, { type }) => {
        state[getActionKey(type)] = { status: PENDING };
      }
    )
    .addMatcher(
      ({ type }) => type.endsWith(`/${RESET}`),
      (state, { type }) => {
        delete state[getActionKey(type)];
        return state;
      }
    )
    .addDefaultCase(() => {});
});
