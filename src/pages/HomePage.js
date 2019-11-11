import React, { Suspense, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { userResource } from 'actions/testActions';
import UserName from 'components/user/UserName';

const HomePage = () => {
  const [userVisibility, setUserVisibility] = useState();
  const dispatch = useDispatch();
  const showUser = useCallback(() => {
    dispatch(userResource);
    setUserVisibility(true);
  }, [dispatch]);

  return (
    <div>
      <button type="button" onClick={showUser}>
        fetch user
      </button>
      {userVisibility && (
        <Suspense fallback={<h3>Loading...</h3>}>
          <UserName />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
