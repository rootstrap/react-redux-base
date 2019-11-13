## Redux setup

### Thunks Middleware

This project has a redux setup that lets you manage async side effects on your actions in less lines of code. 

It can create and dispatch success and error actions for your side effects.
To make use of this functionality you need to create your async actions with the provided `createActionWithThunk` function.
This function receives the action name prefix as the first parameter, and a thunk that has side effects as the second.

Here is an example:
```js
// src/actions/userActions.js

export const getProfile = createActionWithThunk(
  'GET_PROFILE',
  user => userService.login(user),
);
```

The you can dispatch this `getProfile` action, and the middleware will automatically dispatch `GET_PROFILE_SUCCESS` or `GET_PROFILE_ERROR` if the thunk success or fails, respectively.

The returned object, (`getProfile` in the example above) has 3 properties you can use in order to handle the different dispatched actions in your reducer:
- request
- success
- error

Following the previous example:

```js
// src/actions/userActions.js

export const { success: getProfileSuccess } = getProfile;
```

```js
// src/reducers/userReducer.js

import { getProfileSuccess } from 'src/actions/userActions';

const actionHandlers = {
  [getProfileSucess]: (state, { payload }) => {
    state.user = payload;
  },
};
```

### Status reducer

The base also includes a status reducer.
This tracks the status of each action you created with the `createActionWithThunk` utility.

To access this information on a component the `useStatus` hook is provided.

Here is a simple example:

```js
import { useStatus, useDispatch } from 'hooks';
import { getProfile } from 'src/actions/userActions';
import { SUCCESS, LOADING } from 'constants/status';

const MyComponent = () => {
  const getProfileRequest = useDispatch(getProfile);
  const { status, error } = useStatus(profile);

  return <>
    <button onClick={getProfileRequest}>Show profile!</button>
    {(status === LOADING) && <Loading />}
    {(status === SUCCESS) && <ProfileComponent />}
  </>
}
```
