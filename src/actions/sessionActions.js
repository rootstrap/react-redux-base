import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const login = user =>
  async () => {
    const response = await sessionApi.login({ user });
    sessionService.saveUser(response.user);
  };

export const logout = () =>
  async () => {
    await sessionApi.logout();
    sessionService.deleteSession();
    sessionService.deleteUser();
  };
