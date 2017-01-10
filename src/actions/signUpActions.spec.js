import { expect } from 'chai';
import * as signUpActions from '../actions/signUpActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as consts from '../constants/apiConstants.js';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Actions::SignUp', () => {
  describe('sign up a user', () => {
    it('should return the signUpSuccess action', () => {
      const expectedAction = { type: types.SIGN_UP_SUCCESS };
      const action = signUpActions.signUpSuccess();

      expect(action).to.deep.equal(expectedAction);
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
      const response = {
        user: {
          email: 'test@test.com',
          id: 1
        }
      };

      const headers = {
        'access-token': '1234-1234',
        'uid': 'example',
        'client': 'example'
      };

      it('should return the action signUpSuccess', () => {
        nock(consts.API_URL)
        .post('/users', { user })
        .reply(200, response, headers);

        const expectedAction = [{ type: types.SIGN_UP_SUCCESS }];
        const store = mockStore(initialState.signUp);

        return store.dispatch(signUpActions.signUp(user))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedAction);
        });
      });

      it('should change the signUpSuccess in the redux store', () => {
        const store = createStore(rootReducer, initialState);
        const action = signUpActions.signUpSuccess();

        store.dispatch(action);
        expect(store.getState().signUp.signUpSuccess).to.equal(true);
      });
    });

    describe('failure with wrong credentials', () => {
      it('should not change the signUpSuccess in the redux store', () => {
        nock(consts.API_URL)
          .post('/users', { user })
          .reply(401, { error: "Error" });

        const store = mockStore(initialState);

        return store.dispatch(signUpActions.signUp(user))
        .catch(() => {
          expect(store.getState().signUp.signUpSuccess).to.equal(false);
        });
      });
    });
  });
});
