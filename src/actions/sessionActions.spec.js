import * as sessionActions from '../actions/sessionActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Actions::Session', () => {
  describe('create user session', () => {
    it('should return the loginSuccess action', () => {
      const expectedAction = { type: types.LOGIN_SUCCESS };
      const action = sessionActions.loginSuccess();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('delete user session', () => {
    it('should return the logoutSuccess action', () => {
      const expectedAction = { type: types.LOGOUT_SUCCESS };
      const action = sessionActions.logoutSuccess();

      expect(action).toEqual(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('login a user with asynchronous actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const user = {
      email: 'example@example.com',
      password: 'password'
    };

    describe('success with correct credentials', () => {
      it('should change the authenticated flag in the redux store', () => {
        const store = createStore(rootReducer, initialState);
        const action = sessionActions.loginSuccess();

        store.dispatch(action);
        expect(store.getState().session.authenticated).toEqual(true);
      });
    });

    describe('failure with wrong credentials', () => {
      it('should not change the authenticated flag in the redux store', () => {
        nock(config.API_URL)
          .post('/users/sign_in', { user })
          .reply(401, { error: ["Invalid login credentials. Please try again."] });

        const store = mockStore(initialState);

        return store.dispatch(sessionActions.login(user))
        .catch(() => {
          expect(store.getState().session.authenticated).toEqual(false);
        });
      });
    });
  });

  describe('logout a user with asynchronous actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('success', () => {
      it('changes the authenticated flag in the redux store', () => {
        const store = createStore(rootReducer, initialState);
        const action = sessionActions.loginSuccess();

        store.dispatch(action);
        expect(store.getState().session.authenticated).toEqual(true);
      });
    });

    describe('failure', () => {
      it('does not change the authenticated flag in the redux store', () => {
        nock(config.API_URL)
          .post('/users/sign_out')
          .reply(401, { errors: ["Error"] });

        const store = mockStore(initialState);

        return store.dispatch(sessionActions.logout())
        .catch(() => {
          expect(store.getState().session.authenticated).toEqual(false);
        });
      });
    });
  });
});
