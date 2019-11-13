import { SUCCESS, ERROR, REQUEST } from 'constants/status';
import createAction from './createAction';

export default (actionName, thunk) => {
  const request = createAction(`${actionName}_${REQUEST}`);
  const error = createAction(`${actionName}_${ERROR}`);
  const success = createAction(`${actionName}_${SUCCESS}`);

  const action = (...params) => ({
    success,
    error,
    thunk: () => thunk(...params),
    type: request.toString()
  });

  action.request = request;
  action.error = error;
  action.success = success;
  action.toString = () => actionName;

  return action;
};
