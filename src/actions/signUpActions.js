import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import * as session from '../services/sessionService';
import { SubmissionError } from 'redux-form';

export const signUpSuccess = () => {
  return { type: types.SIGN_UP_SUCCESS };
};

export const signUp = (user) => {
  return (dispatch) => {
    return sessionApi.signUp({ user }).then(response => {
      session.saveUser(response.data);
      dispatch(signUpSuccess());
    }).catch(err => {
      throw new SubmissionError(err.errors);
    });
  };
};
