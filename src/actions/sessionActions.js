import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const login = user => async () => {
  try {
    const response = await sessionApi.login({ user });
    sessionService.saveUser(response.user);
  } catch (err) {
    throw new SubmissionError({
      _error: err.error
    });
  }
};

export const logout = () => async () => {
  try {
    await sessionApi.logout();
    sessionService.deleteSession();
    sessionService.deleteUser();
  } catch (err) {
    throw err;
  }
};
