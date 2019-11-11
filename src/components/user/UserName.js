import React from 'react';

import { userResource } from 'actions/testActions';
import { useResource } from 'hooks';

export default function UserName() {
  const user = useResource(userResource);
  return <h2>{user}</h2>;
}
