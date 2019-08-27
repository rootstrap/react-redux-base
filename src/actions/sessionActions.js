import { SubmissionError } from 'redux-form';
import { saveUser, removeSession } from 'react-session-persist';

import sessionApi from 'api/sessionApi';

export const login = user => async () => {
  try {
    const response = await sessionApi.login({ user });
    await saveUser(response.user);
  } catch (err) {
    throw new SubmissionError({
      _error: err.error
    });
  }
};

export const logout = () => async () => {
  try {
    await sessionApi.logout();
    await removeSession();
  } catch (err) {
    throw err;
  }
};
