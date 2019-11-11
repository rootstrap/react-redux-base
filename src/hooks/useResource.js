import { useStatus } from 'hooks';
import { useSelector } from 'react-redux';

import { LOADING, SUCCESS, ERROR } from 'constants/status';

export default resource => {
  const { selector, resourceName } = resource;

  const data = useSelector(selector);
  const { error, status, promise } = useStatus(resourceName);

  if (status === SUCCESS) return data;
  if (status === ERROR) throw error;
  if (status === LOADING) throw promise;
};
