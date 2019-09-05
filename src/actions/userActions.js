import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-session';

import userService from 'services/userService';

export const login = user => async () => {
  try {
    const { data } = await userService.login({ user });
    sessionService.saveUser(data.user);
  } catch (err) {
    throw new SubmissionError({
      _error: err.data.error
    });
  }
};

export const logout = () => async () => {
  try {
    await userService.logout();
    sessionService.deleteSession();
    sessionService.deleteUser();
  } catch (err) {
    throw err.data.error;
  }
};

export const signUp = user => async () => {
  try {
    const { data } = await userService.signUp({ user });
    sessionService.saveUser(data.user);
  } catch (err) {
    throw new SubmissionError(err.data.errors);
  }
};
