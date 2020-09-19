/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ModalButtons from 'components/ModalButtons/ModalButtons';
import { FETCH_CONTACTS_SEND, FETCH_MORE_CONTACTS_SEND } from 'store/actionTypes/contacts';
import styles from './ModalContacts.module.css';

const getItemInfo = (contact) => {
  return `${contact.first_name || 'Unknown First Name'} ${contact.last_name || 'Unknown Last Name'}`;
};

const getListItems = (contactsIds, contacts, isEven, onClick) => {
  const items = [];
  for (let i = 0; i < contactsIds.length; i += 1) {
    const contact = contacts[contactsIds[i]];

    if (isEven && Number(contact.id) % 2 === 0) {
      items.push(
        <ListGroup.Item key={contact.id} onClick={onClick(i)} className={styles.listItem}>
          {getItemInfo(contact)}
        </ListGroup.Item>,
      );
    } else if (!isEven) {
      items.push(
        <ListGroup.Item key={contact.id} onClick={onClick(i)} className={styles.listItem}>
          {getItemInfo(contact)}
        </ListGroup.Item>,
      );
    }
  }

  return items;
};

const ModalContainer = (props) => {
  const { open, onClose, onClickFirstButton, onClickSecondButton, onClickThirdButton, queryParams } = props;

  const [isEvenCheck, setIsEvenCheck] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIndex, setContactIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const contactsRedux = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const onClickContact = useCallback(
    (i) => () => {
      setIsContactModalOpen(true);
      setContactIndex(i);
    },
    [],
  );

  useEffect(() => {
    setListItems(getListItems(contactsRedux.contactsIds, contactsRedux.contacts, isEvenCheck, onClickContact));
  }, [contactsRedux.contacts, contactsRedux.contactsIds, isEvenCheck, onClickContact]);

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
          <div className={styles.searchContainer}>
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
          <div className={styles.container}>
            {contactsRedux.pending ? (
              <Spinner animation="border" />
            ) : (
              <ListGroup id="listGroup" className={styles.body}>
                <InfiniteScroll
                  scrollableTarget="listGroup"
                  dataLength={contactsRedux.contactsIds.length}
                  loader={
                    contactsRedux.pendingMore ? (
                      <div className={styles.spinnerContainer}>
                        <Spinner animation="border" />
                      </div>
                    ) : null
                  }
                  hasMore={contactsRedux.contactsIds.length < contactsRedux.pagination.maxItems}
                  next={fetchMoreContacts}
                  style={{ overflow: false }}
                >
                  {listItems}
                </InfiniteScroll>
              </ListGroup>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
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
          <Modal.Body className={styles.contactModal}>
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
