import { useSelector } from 'react-redux';

/**
 * useStatus hook
 *
 * @param {string} action Prefix for the action names
 *
 * @returns {object} Object with status and error keys
 *
 * @example
 * const { status, error } = useStatus(login)
 */

export default action =>
  useSelector(({ statusReducer }) => {
    const { status, error } = statusReducer[(action?.typePrefix)] || {};
    return {
      status,
      error
    };
  });
