import { getSession, removeSession } from 'react-session-persist';
import parseError from './parseError';
import saveSessionHeaders from './saveSessionHeaders';

export default async response => {
  if (!response) {
    throw new Error({ message: 'No response returned from fetch' });
  }

  await saveSessionHeaders(response.headers);

  if (response.ok) {
    return response;
  }

  if (response.status === 401) {
    try {
      await getSession();
      await removeSession();
    } catch (e) {}
  }

  throw await parseError(response);
};
