import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import userApi from 'api/userApi';

export const signUp = user =>
  () =>
    userApi.signUp({ user }).then(({ user }) => {
      sessionService.saveUser(user);
    }).catch((err) => {
      throw new SubmissionError(err.errors);
    });
