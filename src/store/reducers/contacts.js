import { FETCH_CONTACTS } from 'store/actionTypes/contacts';
import { createCommonAPIReducer } from 'utils/reducerHelpers';

const initialState = {
  contacts: {},
  moreContacts: [],
  error: null,
  pending: false,
  pendingMore: false,
  pagination: {},
};

const reducer = (state = initialState, action) => {
  if (action.type.indexOf(FETCH_CONTACTS) !== -1) {
    return createCommonAPIReducer(state, action, FETCH_CONTACTS, 'contacts', 'contacts', {
      withPagination: true,
    });
  }
  return state;
};

export default reducer;
