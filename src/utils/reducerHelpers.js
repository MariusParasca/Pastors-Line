export function createCommonAPIReducer(state, action, prefix, actionDataProp, newStateDataPropName) {
  if (!state && !action && !prefix) throw new TypeError('state, action and prefix need to be provided');

  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pending = true;
      break;
    case `${prefix}_DONE`:
      newState[newStateDataPropName] = action.data[actionDataProp];
      newState[`${newStateDataPropName}Ids`] = action.data[`${newStateDataPropName}_ids`];
      newState.error = null;
      newState.pending = false;
      newState.pagination = {
        page: newState.pagination.page + 1,
        maxItems: action.data.total,
      };
      break;
    case `${prefix}_FAILED`:
      newState.error = action.error;
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
}

export function createMoreAPIReducer(state, action, prefix, actionDataProp, newStateDataPropName) {
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pendingMore = true;
      break;
    case `${prefix}_DONE`:
      newState[newStateDataPropName] = {
        ...newState[newStateDataPropName],
        ...action.data[actionDataProp],
      };
      newState[`${newStateDataPropName}Ids`] = [
        ...newState[`${newStateDataPropName}Ids`],
        ...action.data[`${newStateDataPropName}_ids`],
      ];
      newState.error = null;
      newState.pendingMore = false;
      newState.pagination = {
        page: newState.pagination.page + 1,
        maxItems: action.data.total,
      };
      break;
    case `${prefix}_FAILED`:
      newState.error = action.error;
      newState.pendingMore = false;
      break;
    default:
      break;
  }

  return newState;
}
