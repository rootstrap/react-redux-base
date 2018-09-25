import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const login = user =>
  () =>
    sessionApi.login({ user }).then(({ user }) => {
      sessionService.saveUser(user);
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.error
      });
    });

export const logout = () =>
  () =>
    sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
    }).catch((err) => {
      throw (err);
    });
