import * as signUpActions from '../actions/signUpActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Actions::SignUp', () => {
  describe('sign up a user', () => {
    it('should return the signUpSuccess action', () => {
      const expectedAction = { type: types.SIGN_UP_SUCCESS };
      const action = signUpActions.signUpSuccess();

      expect(action).toEqual(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('create a user with asynchronous actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const user = {
      email: 'example@example.com',
      password: 'password',
      password_confirmation: 'password'
    };

    describe('success with correct credentials', () => {
      it('should change the authenticated flag in the redux store', () => {
        const store = createStore(rootReducer, initialState);
        const action = signUpActions.signUpSuccess();

        store.dispatch(action);
        expect(store.getState().session.authenticated).toEqual(true);
      });
    });

    describe('failure with wrong credentials', () => {
      it('should not change the authenticated flag in the redux store', () => {
        nock(config.API_URL)
          .post('/users', { user })
          .reply(401, { error: "Error" });

        const store = mockStore(initialState);

        return store.dispatch(signUpActions.signUp(user))
        .catch(() => {
          expect(store.getState().session.authenticated).toEqual(false);
        });
      });
    });
  });
});
