export default type => {
  const action = payload => ({
    type,
    payload
  });
  action.toString = () => type;
  return action;
};
