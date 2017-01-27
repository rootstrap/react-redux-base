import * as constant from '../constants/apiConstants';
import * as localForage from 'localforage';
import { routes } from '../routes';

export const loadSession = () => {
  return localForage.getItem(constant.USER_SESSION)
  .then(value => value)
  .catch(err => err);
};

export const saveSession = (session) => {
  return localForage.setItem(constant.USER_SESSION, session);
};

export const deleteSession = () => {
  return localForage.removeItem(constant.USER_SESSION);
};

export const saveUser = (user) => {
  return localForage.setItem(constant.USER_DATA, user);
};

export const deleteUser = () => {
  return localForage.removeItem(constant.USER_DATA);
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
