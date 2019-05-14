import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = user =>
  async () => {
    try {
      const response = await sessionApi.signUp({ user });
      sessionService.saveUser(response.user);
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };

export const getProfile = () =>
  async () => {
    try {
      const { user } = await sessionApi.getProfile();
      console.log(user);
      // sessionService.saveUser(user);
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };
