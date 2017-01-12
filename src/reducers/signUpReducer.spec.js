import { expect } from 'chai';
import signUpReducer from './signUpReducer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

describe('Reducer::SignUp', () => {
  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = initialState.signUp;

    expect(signUpReducer(undefined, action)).to.deep.equal(expected);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    const action = { type: types.SIGN_UP_SUCCESS };
    const expected = {
      ...initialState.signUp,
      signUpSuccess: true
    };

    expect(signUpReducer(initialState.signUp, action)).to.deep.equal(expected);
  });
});
