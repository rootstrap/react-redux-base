import { USER_SESSION, USER_DATA } from '../constants/constants';
import * as localForage from 'localforage';
import { routes } from '../constants/routesPaths';

export const loadSession = () => {
  return localForage.getItem(USER_SESSION)
  .then(value => value)
  .catch(err => err);
};

export const saveSession = (session) => {
  return localForage.setItem(USER_SESSION, session);
};

export const deleteSession = () => {
  return localForage.removeItem(USER_SESSION);
};

export const saveUser = (user) => {
  return localForage.setItem(USER_DATA, user);
};

export const deleteUser = () => {
  return localForage.removeItem(USER_DATA);
};

export const checkAuth = (nextState, replace, next) => {
  isLogged()
  .then(() => next())
  .catch(() => {
    replace({
      pathname: routes.login,
      state: { nextPathname: nextState.location.pathname }
    });
    next();
  });
};

export const isLogged = () => {
  return new Promise((resolve, reject) => {
    loadSession()
    .then((currentSession) => {
      if (currentSession && currentSession.token) {
        resolve(currentSession);
      } else {
        reject();
      }
    });
  });
};
