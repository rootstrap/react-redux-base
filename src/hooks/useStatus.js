import { useSelector } from 'react-redux';

const useStatus = action =>
  useSelector(({ actionStatus }) => {
    const { status, error, promise } = actionStatus[action] || {};
    return {
      status,
      error,
      promise
    };
  });

export default useStatus;
