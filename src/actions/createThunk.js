import { SUCCESS, ERROR, REQUEST } from 'constants/status';
import createAction from './createAction';

/**
 * @function Generates various action creators
 *
 * @param {string} actionName - Action name, will be used as a prefix for the action creators.
 * @param {function} thunk - This is your async thunk
 * @returns {object} ActionThunk Action that can be dispatched to start the async thunk, can also be
 * deconstructed to get error and success action creators
 *
 * @example
 * export const getProfile = createActionWithThunk(
 *  'LOGIN',
 *   user => userService.login(user),
 * );
 * export const { success, error } = getProfile;
 */

export default (actionName, thunk) => {
  const request = createAction(`${actionName}_${REQUEST}`);
  const error = createAction(`${actionName}_${ERROR}`);
  const success = createAction(`${actionName}_${SUCCESS}`);

  const action = (...params) => ({
    success,
    error,
    thunk: () => thunk(...params),
    type: request.toString()
  });

  action.request = request;
  action.error = error;
  action.success = success;
  action.toString = () => actionName;

  return action;
};
