import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import { Field } from 'redux-form';
import { sessionService } from 'redux-react-session';

import configureStore from 'store/configureStore';
import { SignUpForm } from 'components/user/SignUpForm';
import Input from 'components/common/Input';
import SignUpPage from 'containers/SignUpPage';
import { withStore } from 'utils/testHelpers';

describe('<SignUpPage />', () => {
  let store;
  let subject;
  let form;
  let username;
  let password;
  let passwordConfirmation;
  let userResponse;

  beforeEach(() => {
    store = configureStore();
    subject = mount(withStore(<SignUpPage />, store));
    form = subject.find('form');
    username = subject.find('input').at(0);
    password = subject.find('input').at(1);
    passwordConfirmation = subject.find('input').at(2);

    sessionService.saveUser = jest.fn(() => Promise.resolve());
    sessionService.saveSession = jest.fn(() => Promise.resolve());
    sessionService.loadSession = jest.fn(() => Promise.reject(new Error('Session not found')));
  });

  it('should display an email input', () => {
    expect(subject.find(Field).get(0).props.name).toEqual('email');
  });

  it('should display a password input', () => {
    expect(subject.find(Field).get(1).props.name).toEqual('password');
  });

  it('should display a password confirmation input', () => {
    expect(subject.find(Field).get(2).props.name).toEqual('passwordConfirmation');
  });

  describe('submit with valid form', () => {
    beforeEach(() => {
      const user = {
        email: 'joe@joe.com',
        password: 'password',
        password_confirmation: 'password'
      };

      userResponse = {
        user: {
          id: 1,
          email: 'joe@joe.com',
          uid: 'joe@joe.com',
          provider: 'email'
        }
      };

      nock(process.env.API_URL)
        .post('/users', { user })
        .reply(200, userResponse);

      // load valid data to the form
      username.simulate('change', { target: { value: 'joe@joe.com' } });
      password.simulate('change', { target: { value: 'password' } });
      passwordConfirmation.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');
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
  });

  describe('submit with invalid email', () => {
    beforeEach(() => {
      // load invalid data to the form
      username.simulate('change', { target: { value: 'invalid email' } });
      password.simulate('change', { target: { value: 'password' } });
      passwordConfirmation.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const signUpForm = subject.find(SignUpForm);
      expect(signUpForm.props().valid).toEqual(false);
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
      passwordConfirmation.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const signUpForm = subject.find(SignUpForm);
      expect(signUpForm.props().valid).toEqual(false);
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
      passwordConfirmation.simulate('change', { target: { value: 'password' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const signUpForm = subject.find(SignUpForm);
      expect(signUpForm.props().valid).toEqual(false);
    });

    it('should display an error in the field', () => {
      const passwordInput = subject.find(Input).at(1);
      expect(passwordInput.props().meta.error).toHaveLength(1);
    });
  });

  describe('submit with non matching passwords', () => {
    beforeEach(() => {
      // load invalid data to the form
      username.simulate('change', { target: { value: 'joe@joe.com' } });
      password.simulate('change', { target: { value: 'password' } });
      passwordConfirmation.simulate('change', { target: { value: 'password2' } });
      form.simulate('submit');
    });

    it('should be an invalid form', () => {
      const signUpForm = subject.find(SignUpForm);
      expect(signUpForm.props().valid).toEqual(false);
    });

    it('should display an error in the field', () => {
      const passwordInput = subject.find(Input).at(2);
      expect(passwordInput.props().meta.error).toHaveLength(1);
    });
  });
});
