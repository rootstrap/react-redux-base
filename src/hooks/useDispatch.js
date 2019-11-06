import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default (action, ...dependencies) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(payload => dispatch(action(payload)), [dispatch, action, ...dependencies]);
};
