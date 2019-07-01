import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = user =>
  async () => {
    const response = await sessionApi.signUp({ user });
    sessionService.saveUser(response.user);
  };
