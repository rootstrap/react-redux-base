import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-session';
import { push } from 'react-router-redux';

import sessionApi from '../api/sessionApi';
import routes from '../constants/routesPaths';

export const signUp = user =>
  dispatch =>
    sessionApi.signUp({ user }).then(({ user }) => {
      sessionService.saveUser(user).then(() => {
        dispatch(push(routes.index));
      });
    }).catch((err) => {
      throw new SubmissionError(err.errors);
    });
