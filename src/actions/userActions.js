import { SubmissionError } from 'redux-form';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  UPDATE_SESSION
} from 'actions/actionTypes';
import createAction from 'actions/createAction';
import userService from 'services/userService';

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR);

export const signupRequest = createAction(SIGNUP_REQUEST);
export const signupSuccess = createAction(SIGNUP_SUCCESS);
export const signupError = createAction(SIGNUP_ERROR);

export const logoutRequest = createAction(LOGOUT_REQUEST);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const updateSession = createAction(UPDATE_SESSION);

export const login = user => async dispatch => {
  try {
    dispatch(loginRequest());
    const {
      data: { user: createdUser }
    } = await userService.login({ user });
    dispatch(loginSuccess(createdUser));
  } catch (err) {
    dispatch(loginError(err.data.error));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(logoutRequest());
    await userService.logout();
    dispatch(logoutSuccess());
  } catch (err) {
    throw err.data.error;
  }
};

export const signUp = user => async dispatch => {
  try {
    dispatch(signupRequest());
    const {
      data: { user: createdUser }
    } = await userService.signUp({ user });
    dispatch(signupSuccess(createdUser));
  } catch (err) {
    dispatch(signupError());
    throw new SubmissionError(err.data.errors);
  }
};
