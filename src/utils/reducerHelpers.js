export function createCommonAPIReducer(
  state,
  action,
  prefix,
  actionDataProp,
  newStateDataPropName,
  options = { withPagination: false },
) {
  if (!state && !action && !prefix) throw new TypeError('state, action and prefix need to be provided');

  const { withPagination } = {
    withPagination: false,
    ...options,
  };
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pending = !state.autoRefresh;
      break;
    case `${prefix}_DONE`:
      newState[newStateDataPropName] = action.data[actionDataProp];
      newState.error = null;
      newState.pending = false;
      if (withPagination) {
        // const page = Number(action.headers['x-paginate-page']);
        // const itemsPerPage = Number(action.headers['x-paginate-per-page']);
        // const maxItems = Number(action.headers['x-paginate-total']);
        // newState.pagination = {
        //   page: isNaN(page) ? 0 : page,
        //   itemsPerPage: isNaN(itemsPerPage) ? 0 : itemsPerPage,
        //   maxItems: isNaN(maxItems) ? 0 : maxItems,
        // };
      }
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

export function createMoreAPIReducer(
  state,
  action,
  prefix,
  actionDataProp,
  newStateDataPropName,
  options = { withPagination: true },
) {
  const { withPagination } = options;
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pendingMore = true;
      break;
    case `${prefix}_DONE`:
      newState[newStateDataPropName] = [...newState[newStateDataPropName], ...action.data[actionDataProp]];
      newState.error = null;
      newState.pendingMore = false;
      if (withPagination) {
        // const page = Number(action.headers['x-paginate-page']);
        // const itemsPerPage = Number(action.headers['x-paginate-per-page']);
        // const maxItems = Number(action.headers['x-paginate-total']);
        // newState.pagination = {
        //   page: isNaN(page) ? 0 : page,
        //   itemsPerPage: isNaN(itemsPerPage) ? 0 : itemsPerPage,
        //   maxItems: isNaN(maxItems) ? 0 : maxItems,
        // };
      }
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
