import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-session';

import userService from 'services/userService';

export const login = user => async () => {
  try {
    const response = await userService.login({ user });
    sessionService.saveUser(response.user);
  } catch (err) {
    throw new SubmissionError({
      _error: err.error
    });
  }
};

export const logout = () => async () => {
  try {
    await userService.logout();
    sessionService.deleteSession();
    sessionService.deleteUser();
  } catch (err) {
    throw err;
  }
};

export const signUp = user => async () => {
  try {
    const response = await userService.signUp({ user });
    sessionService.saveUser(response.user);
  } catch (err) {
    throw new SubmissionError(err.errors);
  }
};
