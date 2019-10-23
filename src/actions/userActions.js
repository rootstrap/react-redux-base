import { SubmissionError } from 'redux-form';

import { SAVE_SESSION, SAVE_USER, REMOVE_DATA } from 'actions/actionTypes';
import createAction from 'actions/createAction';
import userService from 'services/userService';

export const saveSession = createAction(SAVE_SESSION);

export const saveUser = createAction(SAVE_USER);

export const removeData = createAction(REMOVE_DATA);

export const login = user => async dispatch => {
  try {
    const {
      data: { user: createdUser }
    } = await userService.login({ user });
    dispatch(saveUser(createdUser));
  } catch (err) {
    throw new SubmissionError({
      _error: err.data.error
    });
  }
};

export const logout = () => async dispatch => {
  try {
    await userService.logout();
    dispatch(removeData());
  } catch (err) {
    throw err.data.error;
  }
};

export const signUp = user => async dispatch => {
  try {
    const {
      data: { user: createdUser }
    } = await userService.signUp({ user });
    dispatch(saveUser(createdUser));
  } catch (err) {
    throw new SubmissionError(err.data.errors);
  }
};
