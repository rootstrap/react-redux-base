import validate from 'validate.js';

export const login = {
  email: {
    presence: { message: '^emailPresence' },
    email: { message: '^emailInvalid' },
  },
  password: {
    presence: { message: '^passwordPresence' },
  }
};

export const signUp = {
  email: {
    presence: { message: '^emailPresence' },
    email: { message: '^emailInvalid' }
  },
  password: {
    presence: { message: '^passwordPresence' }
  },
  passwordConfirmation: {
    presence: { message: '^confirmationPresence' },
    equality: { attribute: 'password', message: '^confirmationEquality' }
  }
};

export const validations = constraints =>
  data => validate(data, constraints) || {};
