import { expect } from 'chai';
import * as sessionActions from '../actions/sessionActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as consts from '../constants/apiConstants.js';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Login Actions', () => {
  describe('create user session', () => {

    it('returns the loginSuccess action', () => {
      const expectedAction = { type: types.LOGIN_SUCCESS };
      const action = sessionActions.loginSuccess();

      expect(action).to.deep.equal(expectedAction);
    });
  });

  describe('delete user session', () => {
    it('returns the logoutSuccess action', () => {
      const expectedAction = { type: types.LOGOUT_SUCCESS };
      const action = sessionActions.logoutSuccess();

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
      password: 'password'
    };

    describe('success with correct credencials', () => {
      const response = {
        data: {
          email: 'test@test.com',
          username: 'test@test.com'
        }
      };

      const headers = {
        'access-token': '1234-1234',
        'uid': 'example',
        'client': 'example'
      }

      nock(consts.API_URL)
        .post('/users/sign_in', { user })
        .reply(200, response, headers);

      it('it returns the action loginSuccess', () => {
        const expectedAction = [{ type: types.LOGIN_SUCCESS }];
        const store = mockStore(initialState.login);

        return store.dispatch(sessionActions.login(user))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedAction);
        });
      });

      it('changes the loginSuccess in the redux store', () => {
        const store = createStore(rootReducer, initialState);
        const action = sessionActions.loginSuccess();

        store.dispatch(action);
        expect(store.getState().session.loginSuccess).to.equal(true);
      });
    });

    // describe('No exitoso', () => {

    //   it('Cuando las credenciales no son correctas', () => {
    //     nock(consts.API_STAGING_URL)
    //       .post('/users/sign_in', user)
    //       .reply(401, { error: 'Login incorrecto' });

    //     it('Devuelve la acción loginError con login', () => {
    //       const expectedAction = [{ type: types.LOGIN_USER_ERROR, response: { error: 'Login incorrecto' } }];
    //       const store = mockStore(initialState.user);
    //       return store.dispatch(loginActions.login(user, history))
    //         .then(() => {
    //           expect(store.getActions()[0].response).to.deep.equal(expectedAction[0].response);
    //         });
    //     });

    //     it('La acción loginError cambia a success en el store', () => {
    //       const action = {
    //         type: types.LOGIN_USER_ERROR, response: { error: 'Login incorrecto' }
    //       };
    //       const store = createStore(rootReducer, initialState);

    //       store.dispatch(action);
    //       expect(store.getState().login.errorLogin).to.equal('Login incorrecto');
    //     });
    //   });
    // });
  });
});
