import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default (action, ...dependencies) => {
  const dispatch = useDispatch();
  return useCallback(payload => dispatch(action(payload)), [dispatch, ...dependencies]);
};
