import createAction from 'actions/createAction';
import userService from 'services/userService';

import createActionWithThunk from './createThunk';

export const login = createActionWithThunk('LOGIN', async user => {
  try {
    const {
      data: { user: createdUser }
    } = await userService.login({ user });
    return createdUser;
  } catch (err) {
    throw err.data.error;
  }
});

export const logout = createActionWithThunk('LOGOUT', async () => {
  try {
    await userService.logout();
  } catch (err) {
    throw err.data.error;
  }
});

export const signUp = createActionWithThunk('SIGNUP', async user => {
  try {
    const {
      data: { user: createdUser }
    } = await userService.signUp({ user });
    return createdUser;
  } catch (err) {
    throw err.data.error;
  }
});

export const updateSession = createAction('UPDATE_SESSION');

export const { success: loginSuccess } = login;
export const { success: signUpSuccess } = signUp;
export const { success: logoutSuccess } = logout;
