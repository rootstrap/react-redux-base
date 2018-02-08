import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { routes } from '../constants/routesPaths';
import * as types from '../actions/actionTypes';

const signUpSent = () => ({
  type: types.SIGN_UP_SENT,
});

const signUpSuccess = () => ({
  type: types.SIGN_UP_SUCCESS,
});

const signUpFailure = () => ({
  type: types.SIGN_UP_FAILURE,
});

export const signUp = user =>
  (dispatch) => {
    dispatch(signUpSent());
    sessionApi.signUp({ user }).then(({ user }) => {
      sessionService.saveUser(user)
      .then(() => {
        dispatch(signUpSuccess());
        browserHistory.push(routes.index);
      });
    }).catch((err) => {
      dispatch(signUpFailure());
      throw new SubmissionError(err.errors);
    });
  };
