import { createSelector } from 'reselect';

export const contactsReduxSelector = (state) => state.contacts;

export const rawContactsSelector = createSelector(contactsReduxSelector, (contactsRedux) => contactsRedux.contacts);

export const rawContactsIdsSelector = createSelector(
  contactsReduxSelector,
  (contactsRedux) => contactsRedux.contactsIds,
);

export const contactsSelector = createSelector(
  rawContactsSelector,
  rawContactsIdsSelector,
  (rawContacts, rawContactsIds) => {
    const result = [];
    for (let i = 0; i < rawContactsIds.length; i += 1) {
      const contact = rawContacts[rawContactsIds[i]];
      result.push(contact);
    }
    return result;
  },
);

export const contactsEvenIdSelector = createSelector(contactsSelector, (contacts) =>
  contacts.filter((contact) => contact.id % 2 === 0),
);
