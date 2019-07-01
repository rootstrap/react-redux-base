import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = (user, setErrors, setSubmitting) =>
  async () => {
    try {
      const response = await sessionApi.signUp({ user });
      sessionService.saveUser(response.user);
    } catch (err) {
      setErrors(err.errors);
    } finally {
      setSubmitting(false);
    }
  };
