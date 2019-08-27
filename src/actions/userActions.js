import { SubmissionError } from 'redux-form';
import { saveUser } from 'react-session-persist';

import sessionApi from 'api/sessionApi';

export const signUp = user => async () => {
  try {
    const response = await sessionApi.signUp({ user });
    await saveUser(response.user);
  } catch (err) {
    throw new SubmissionError(err.errors);
  }
};
