import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = (user, setError, setSubmitting) =>
  async () => {
    try {
      const response = await sessionApi.signUp({ user });
      sessionService.saveUser(response.user);
    } catch (err) {
      setError(err.errors);
    } finally {
      setSubmitting(false);
    }
  };
