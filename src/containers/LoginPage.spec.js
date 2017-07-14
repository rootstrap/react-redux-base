import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import nock from 'nock';
import { Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import configureStore from '../store/configureStore';
import LoginPage from './LoginPage';
import { LoginForm } from '../components/session/LoginForm';
import Input from '../components/common/Input';
import { routes } from '../constants/routesPaths';

describe('<LoginPage />', () => {
  let store;
  let subject;
  let form;
  let username;
  let password;
  let userResponse;

  beforeEach(() => {
    store = configureStore();
    subject = mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    form = subject.find('form');
    username = subject.find('input').at(0);
    password = subject.find('input').at(1);

    sessionService.saveUser = jest.fn(() => Promise.resolve());
    sessionService.saveSession = jest.fn(() => Promise.resolve());
    sessionService.loadSession = jest.fn(() => Promise.resolve());
  });

  it('should display an email input', () => {
    expect(subject.find(Field).get(0).props.name).toEqual('email');
  });

  it('should display a password input', () => {
    expect(subject.find(Field).get(1).props.name).toEqual('password');
  });

  describe('submit with valid form', () => {
    beforeEach(() => {
      const user = {
        email: 'joe@joe.com',
        password: 'password'
      };

      userResponse = {
        user: {
          id: 1,
          email: 'joe@joe.com',
          uid: 'joe@joe.com',
          provider: 'email'
        }
      };

      nock(config.API_URL)
      .post('/users/sign_in', { user })
      .reply(200, userResponse);

      // load valid data to the form
      username.simulate('change', { target: { value: 'joe@joe.com' } });
      password.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');

      browserHistory.push = jest.fn(() => Promise.resolve());
    });

    it('should call redux-session-service to save the user data', (done) => {
      // wait for the call to save user
      sessionService.saveUser = jest.fn(() => {
        expect(sessionService.saveUser).toHaveBeenCalled();
        done();
        return Promise.resolve();
      });
    });

    it('should save the user data', (done) => {
      // wait for the call to save user
      sessionService.saveUser = jest.fn(() => {
        expect(sessionService.saveUser).toHaveBeenCalledWith(userResponse.user);
        done();
        return Promise.resolve();
      });
    });

    it('should redirect to the home page', (done) => {
      // wait for the call to redirect
      browserHistory.push = jest.fn(() => {
        expect(browserHistory.push).toHaveBeenCalledWith(routes.index);
        done();
      });
    });
  });

  describe('submit with invalid email', () => {
    beforeEach(() => {
      // load invalid data to the form
      username.simulate('change', { target: { value: 'invalid email' } });
      password.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const loginForm = subject.find(LoginForm);
      expect(loginForm.props().valid).toEqual(false);
    });

    it('should display an error in the field', () => {
      const emailInput = subject.find(Input).at(0);
      expect(emailInput.props().meta.error).toHaveLength(1);
    });
  });

  describe('submit with blank email', () => {
    beforeEach(() => {
      // load invalid data to the form
      username.simulate('change', { target: { value: '' } });
      password.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const loginForm = subject.find(LoginForm);
      expect(loginForm.props().valid).toEqual(false);
    });

    it('should display an error in the field', () => {
      const emailInput = subject.find(Input).at(0);
      expect(emailInput.props().meta.error).toHaveLength(1);
    });
  });

  describe('submit with blank password', () => {
    beforeEach(() => {
      // load invalid data to the form
      username.simulate('change', { target: { value: 'joe@joe.com' } });
      password.simulate('change', { target: { value: '' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const loginForm = subject.find(LoginForm);
      expect(loginForm.props().valid).toEqual(false);
    });

    it('should display an error in the field', () => {
      const passwordInput = subject.find(Input).at(1);
      expect(passwordInput.props().meta.error).toHaveLength(1);
    });
  });

  describe('submit with errors from server', () => {
    beforeEach(() => {
      const user = {
        email: 'joe@joe.com',
        password: 'invalidPassword'
      };
      const serverError = { errors: ['Invalid login credentials. Please try again.'] };

      nock(config.API_URL)
      .post('/users/sign_in', { user })
      .reply(401, serverError);

      // load invalid data to the form
      username.simulate('change', { target: { value: 'joe@joe.com' } });
      password.simulate('change', { target: { value: 'invalidPassword' } });
      form.simulate('submit');
    });

    it('should not be a valid form', (done) => {
      // wait for changes in the redux store
      const unsubscribe = store.subscribe(() => {
        const loginForm = subject.find(LoginForm);
        expect(loginForm.props().valid).toEqual(false);
        unsubscribe();
        done();
      });
    });

    it('should display the server error in the form', (done) => {
      // wait for changes in the redux store
      const unsubscribe = store.subscribe(() => {
        const generalError = subject.find('strong');
        const error = 'Invalid login credentials. Please try again.';
        expect(generalError.text()).toEqual(error);
        unsubscribe();
        done();
      });
    });
  });
});
