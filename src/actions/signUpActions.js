import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { routes } from '../constants/routesPaths';

export const signUp = user =>
  () =>
    sessionApi.signUp({ user }).then(({ user }) => {
      sessionService.saveUser(user)
      .then(() => {
        browserHistory.push(routes.index);
      });
    }).catch((err) => {
      throw new SubmissionError(err.errors);
    });
