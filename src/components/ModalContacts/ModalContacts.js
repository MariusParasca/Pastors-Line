/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ModalButtons from 'components/ModalButtons/ModalButtons';
import { FETCH_CONTACTS_SEND, FETCH_MORE_CONTACTS_SEND } from 'store/actionTypes/contacts';
import './ModalContacts.scss';
import { contactsSelector, contactsReduxSelector, contactsEvenIdSelector } from 'store/selectors/contacts';

const getItemInfo = (contact) => {
  return `${contact.first_name || 'Unknown First Name'} ${contact.last_name || 'Unknown Last Name'}`;
};

const getListItems = (contacts, onClick) =>
  contacts.map((contact, index) => (
    <ListGroup.Item key={contact.id} onClick={onClick(index)} className="ModalContainer-listItem">
      {getItemInfo(contact)}
    </ListGroup.Item>
  ));

const ModalContainer = (props) => {
  const { open, onClose, onClickFirstButton, onClickSecondButton, onClickThirdButton, queryParams } = props;

  const [isEvenCheck, setIsEvenCheck] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIndex, setContactIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const contactsRedux = useSelector(contactsReduxSelector);
  const contacts = useSelector(contactsSelector);
  const contactsEvenId = useSelector(contactsEvenIdSelector);

  const dispatch = useDispatch();

  const onClickContact = useCallback(
    (i) => () => {
      setIsContactModalOpen(true);
      setContactIndex(i);
    },
    [],
  );

  const toggleEvenCheck = useCallback(() => {
    setIsEvenCheck(!isEvenCheck);
  }, [isEvenCheck]);

  const fetchMoreContacts = useCallback(() => {
    dispatch({
      type: FETCH_MORE_CONTACTS_SEND,
      queryParams: { ...queryParams, page: contactsRedux.pagination.page + 1 },
    });
  }, [contactsRedux.pagination.page, dispatch, queryParams]);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const onChangeSearchValue = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        dispatch({ type: FETCH_CONTACTS_SEND, queryParams: { ...queryParams, query: searchValue } });
      }
    },
    [dispatch, queryParams, searchValue],
  );

  useEffect(() => {
    let intervalId;
    if (searchValue) {
      intervalId = setTimeout(() => {
        dispatch({ type: FETCH_CONTACTS_SEND, queryParams: { ...queryParams, query: searchValue } });
      }, 400);
    }

    return () => {
      clearTimeout(intervalId);
    };
  }, [dispatch, queryParams, searchValue]);

  return (
    <>
      <Modal show={open} onHide={onClose} backdrop="static">
        <Modal.Body>
          <ModalButtons
            onClickFirstButton={onClickFirstButton}
            onClickSecondButton={onClickSecondButton}
            onClickThirdButton={onClickThirdButton}
          />
          <div className="ModalContainer-searchContainer">
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={searchValue}
                onChange={onChangeSearchValue}
                onKeyDown={onKeyDown}
              />
            </InputGroup>
          </div>
          <div className="ModalContainer-container">
            {contactsRedux.pending ? (
              <Spinner animation="border" />
            ) : (
              <ListGroup id="listGroup" className="ModalContainer-body">
                <InfiniteScroll
                  scrollableTarget="listGroup"
                  dataLength={contactsRedux.contactsIds.length}
                  loader={
                    contactsRedux.pendingMore ? (
                      <div className="ModalContainer-spinnerContainer">
                        <Spinner animation="border" />
                      </div>
                    ) : null
                  }
                  hasMore={contactsRedux.contactsIds.length < contactsRedux.pagination.maxItems}
                  next={fetchMoreContacts}
                  style={{ overflow: false }}
                >
                  {getListItems(isEvenCheck ? contactsEvenId : contacts, onClickContact)}
                </InfiniteScroll>
              </ListGroup>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="ModalContainer-footer">
          <Form.Check
            disabled={contactsRedux.pending || contactsRedux.pendingMore}
            type="checkbox"
            label="Only even"
            checked={isEvenCheck}
            onChange={toggleEvenCheck}
          />
        </Modal.Footer>
      </Modal>
      {isContactModalOpen && (
        <Modal show={isContactModalOpen} onHide={closeContactModal} backdrop="static">
          <Modal.Header closeButton>Contact Info</Modal.Header>
          <Modal.Body className="ModalContainer-contactModal">
            Color: {contactsRedux.contacts[contactsRedux.contactsIds[contactIndex]].color} Phone number:{' '}
            {contactsRedux.contacts[contactsRedux.contactsIds[contactIndex]].phone_number}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

ModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickFirstButton: PropTypes.func.isRequired,
  onClickSecondButton: PropTypes.func.isRequired,
  onClickThirdButton: PropTypes.func.isRequired,
  queryParams: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalContainer;
