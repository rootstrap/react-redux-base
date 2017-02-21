import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import * as session from '../services/sessionService';
import { routes } from '../constants/routesPaths';

export const signUpSuccess = () => {
  return { type: types.SIGN_UP_SUCCESS };
};

export const signUp = (user) => {
  return (dispatch) => {
    return sessionApi.signUp({ user }).then(response => {
      session.saveUser(response.data)
      .then(() => {
        dispatch(signUpSuccess());
        browserHistory.replace(routes.index);
      });
    }).catch(err => {
      throw new SubmissionError(err.errors);
    });
  };
};
