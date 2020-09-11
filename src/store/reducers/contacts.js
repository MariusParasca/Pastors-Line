import { FETCH_CONTACTS, FETCH_MORE_CONTACTS, RESET_CONTACTS } from 'store/actionTypes/contacts';
import { createCommonAPIReducer, createMoreAPIReducer } from 'utils/reducerHelpers';

const initialState = {
  contacts: [],
  moreContacts: [],
  error: null,
  pending: false,
  pendingMore: false,
  pagination: {
    page: 0,
    itemsPerPage: 0,
    maxItems: 0,
  },
};

const reducer = (state = initialState, action) => {
  if (action.type.indexOf(FETCH_CONTACTS) !== -1) {
    return createCommonAPIReducer(state, action, FETCH_CONTACTS, 'contacts', 'contacts');
  }

  if (action.type.indexOf(FETCH_MORE_CONTACTS) !== -1) {
    return createMoreAPIReducer(state, action, FETCH_MORE_CONTACTS, 'contacts', 'contacts');
  }

  if (action.type === RESET_CONTACTS) {
    return initialState;
  }
  return state;
};

export default reducer;
