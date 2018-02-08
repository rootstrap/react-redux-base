import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { routes } from '../constants/routesPaths';
import * as types from '../actions/actionTypes';

const loginSent = () => ({
  type: types.LOGIN_SENT,
});

const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

const loginFailure = () => ({
  type: types.LOGIN_FAILURE,
});

const logoutSent = () => ({
  type: types.LOGOUT_SENT,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFailure = () => ({
  type: types.LOGOUT_FAILURE,
});

export const login = user =>
  (dispatch) => {
    dispatch(loginSent());
    return sessionApi.login({ user }).then(({ user }) => {
      sessionService.saveUser(user)
      .then(() => {
        dispatch(loginSuccess());
        browserHistory.push(routes.index);
      });
    }).catch((err) => {
      dispatch(loginFailure());
      throw new SubmissionError({
        _error: err.error
      });
    });
  };

export const logout = () =>
  (dispatch) => {
    dispatch(logoutSent());
    return sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      dispatch(logoutSuccess());
      browserHistory.push(routes.login);
    }).catch((err) => {
      dispatch(logoutFailure());
      throw (err);
    });
  };
