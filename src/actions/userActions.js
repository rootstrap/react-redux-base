import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = (user, setStatus, setSubmitting) =>
  async () => {
    try {
      const response = await sessionApi.signUp({ user });
      sessionService.saveUser(response.user);
    } catch (err) {
      setStatus(err.errors);
    } finally {
      setSubmitting(false);
    }
  };
