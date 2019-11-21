export default ({ dispatch }) => next => async action => {
  next(action);

  const { thunk, success, error } = action;
  if (typeof thunk === 'function') {
    try {
      const response = await thunk();
      dispatch(success(response));
    } catch (err) {
      dispatch(error(err));
    }
  }
};
