import sessionReducer from './sessionReducer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

describe('Reducer::Session', () => {
  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = initialState.session;

    expect(sessionReducer(undefined, action)).toEqual(expected);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = { type: types.LOGIN_SUCCESS };
    const expected = {
      authenticated: true
    };

    expect(sessionReducer(initialState.session, action)).toEqual(expected);
  });

  it('should handle SIGN_UP_SUCCESS', () => {
    const action = { type: types.SIGN_UP_SUCCESS };
    const expected = {
      authenticated: true
    };

    expect(sessionReducer(initialState.session, action)).toEqual(expected);
  });

  it('should handle GET_SESSION_SUCCESS', () => {
    const action = { type: types.GET_SESSION_SUCCESS };
    const expected = {
      authenticated: true
    };

    expect(sessionReducer(initialState.session, action)).toEqual(expected);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const action = { type: types.LOGOUT_SUCCESS };
    const expected = {
      authenticated: false
    };

    expect(sessionReducer(initialState.session, action)).toEqual(expected);
  });

  it('should handle GET_SESSION_ERROR', () => {
    const action = { type: types.GET_SESSION_ERROR };
    const expected = {
      authenticated: false
    };

    expect(sessionReducer(initialState.session, action)).toEqual(expected);
  });
});
