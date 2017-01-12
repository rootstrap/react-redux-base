import { expect } from 'chai';
import sessionReducer from './sessionReducer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

describe('Reducer::Session', () => {
  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = initialState.session;

    expect(sessionReducer(undefined, action)).to.deep.equal(expected);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = { type: types.LOGIN_SUCCESS };
    const expected = {
      ...initialState.session,
      loginSuccess: true
    };

    expect(sessionReducer(initialState.session, action)).to.deep.equal(expected);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const action = { type: types.LOGOUT_SUCCESS };
    const expected = {
      ...initialState.session,
      logoutSuccess: true
    };

    expect(sessionReducer(initialState.session, action)).to.deep.equal(expected);
  });
});
