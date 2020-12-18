import { createAction } from '@reduxjs/toolkit';

import userService from 'services/userService';
import parseError from 'utils/parseError';
import createAsyncThunk from 'utils/createAsyncThunk';

export const login = createAsyncThunk('user/login', async user => {
  try {
    const {
      data: { data }
    } = await userService.login({ user });
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await userService.logout();
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const signUp = createAsyncThunk('user/signup', async user => {
  try {
    const { data } = await userService.signUp({ user });
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const updateSession = createAction('session/update');

export const { fulfilled: loginFulfilled, rejected: loginRejected } = login;
export const { fulfilled: signUpFulfilled } = signUp;
export const { fulfilled: logoutFulfilled } = logout;
