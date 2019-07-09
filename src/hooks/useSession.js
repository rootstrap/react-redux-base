import { useSelector } from 'react-redux';

const useSession = () =>
  useSelector(({ session }) => ({
    authenticated: session.authenticated,
    checked: session.checked,
    user: session.user
  }));

export default useSession;
