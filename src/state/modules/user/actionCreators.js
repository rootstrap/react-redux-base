import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import userApi from 'api/userApi';

export const signUp = user =>
  async () => {
    try {
      const response = await userApi.signUp({ user });
      sessionService.saveUser(response.user);
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };
