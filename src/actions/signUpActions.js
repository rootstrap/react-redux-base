import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import * as session from '../services/sessionService';

export const signUpSuccess = () => {
  return { type: types.SIGN_UP_SUCCESS };
};

export const signUp = (user) => {
  return (dispatch) => {
    return sessionApi.signUp({ user }).then(response => {
      session.saveUser(response.data)
      .then(() => {
        dispatch(signUpSuccess());
        browserHistory.replace('/');
      });
    }).catch(err => {
      throw new SubmissionError(err.errors);
    });
  };
};
