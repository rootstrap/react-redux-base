import createAction from './createAction';

export default (resourceName, selector, handler) => {
  const success = createAction(`${resourceName}_SUCCESS`);
  const error = createAction(`${resourceName}_ERROR`);
  const request = createAction(`${resourceName}_REQUEST`);
  const type = createAction(`${resourceName}_RESOURCE`);

  return {
    resourceName,
    selector,
    success,
    error,
    request,
    handler,
    type
  };
};
