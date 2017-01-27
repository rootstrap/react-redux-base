import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import * as session from '../services/sessionService';
import { routes } from '../routes';

export const loginSuccess = () => {
  return { type: types.LOGIN_SUCCESS };
};

export const logoutSuccess = () => {
  return { type: types.LOGOUT_SUCCESS };
};

export const getSessionSuccess = () => {
  return { type: types.GET_SESSION_SUCCESS };
};

export const getSessionError = () => {
  return { type: types.GET_SESSION_ERROR };
};

export const login = (user) => {
  return (dispatch) => {
    return sessionApi.login({ user }).then(response => {
      session.saveUser(response.data)
      .then(() => {
        dispatch(loginSuccess());
        browserHistory.replace(routes.index);
      });
    }).catch(err => {
      throw new SubmissionError({
        _error: err.errors[0]
      });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return sessionApi.logout().then(() => {
      session.deleteSession();
      session.deleteUser();
      dispatch(logoutSuccess());
      browserHistory.replace(routes.login);
    }).catch(err => {
      throw (err);
    });
  };
};

export const checkSession = () => {
  return (dispatch) => {
    return session.isLogged().then(() => {
      dispatch(getSessionSuccess());
    }).catch(() => {
      dispatch(getSessionError());
    });
  };
};
