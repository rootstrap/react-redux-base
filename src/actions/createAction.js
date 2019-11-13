/**
 * @function createAction Generates an action creator
 * @param {string} type - Action type
 * @returns {function} Action that can be dispatched, has toString method
 * @example
 * const loginSuccess = createAction('LOGIN_SUCCESS');
 */
export default type => {
  const action = payload => ({
    type,
    payload
  });
  action.toString = () => type;
  return action;
};
