import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import { RESET } from 'constants/actionStatusConstants';

export default (type, payload, options) => {
  const thunk = createAsyncThunk(type, payload, options);
  thunk.reset = createAction(`${type}/${RESET}`);
  return thunk;
};
