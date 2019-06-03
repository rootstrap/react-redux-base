export default (initialState, actionHandlers) =>
  (state = initialState, action) =>
    (actionHandlers[action.type] ? actionHandlers[action.type](state, action) : state);
