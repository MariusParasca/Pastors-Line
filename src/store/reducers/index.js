import { combineReducers } from 'redux';

import contactsReducer from './contacts';

const appReducer = combineReducers({
  contacts: contactsReducer,
});

export default appReducer;
