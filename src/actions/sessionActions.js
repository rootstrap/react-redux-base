import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const login = (user, setErrors, setSubmitting) =>
  async () => {
    try {
      const response = await sessionApi.login({ user });
      sessionService.saveUser(response.user);
    } catch (err) {
      setErrors(err.error);
    } finally {
      setSubmitting(false);
    }
  };

export const logout = () =>
  async () => {
    try {
      await sessionApi.logout();
      sessionService.deleteSession();
      sessionService.deleteUser();
    } catch (err) {
      throw (err);
    }
  };
