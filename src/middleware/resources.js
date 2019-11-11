const isResouce = action => /_RESOURCE$/.test(action);

export default ({ dispatch }) => next => async action => {
  const { type, handler, success, error, request } = action;
  if (!isResouce(type)) return next(action);

  const promise = async () => {
    try {
      const response = await handler();
      dispatch(success(response));
    } catch (err) {
      dispatch(error(err));
    }
  };
  dispatch(request(promise()));
};
