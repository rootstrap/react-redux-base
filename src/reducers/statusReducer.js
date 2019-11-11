import { produce } from 'immer';
import { NOT_STARTED, LOADING, SUCCESS, ERROR } from 'constants/status';

const handleAction = (state, action) => {
  const { type, payload } = action;

  const matchesStart = /(.*)_REQUEST/.exec(type);
  const matchesError = /(.*)_ERROR/.exec(type);
  const matchesReset = /(.*)_RESET/.exec(type);
  const matchesSuccess = /(.*)_SUCCESS/.exec(type);

  let status = NOT_STARTED;
  let key = null;
  let promise;

  if (matchesStart) {
    const [, requestName] = matchesStart;
    promise = action.payload;
    key = requestName;
    status = LOADING;
  } else if (matchesReset) {
    const [, requestName] = matchesReset;
    key = requestName;
    status = NOT_STARTED;
  } else if (matchesError) {
    const [, requestName] = matchesError;
    key = requestName;
    status = ERROR;
  } else if (matchesSuccess) {
    const [, requestName] = matchesSuccess;
    key = requestName;
    status = SUCCESS;
  }

  if (key) state[key] = { status, error: payload, promise };

  return state;
};

export default (state = {}, action) => produce(state, draft => handleAction(draft, action));
