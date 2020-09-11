/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ModalButtons from 'components/ModalButtons/ModalButtons';
import { FETCH_MORE_CONTACTS_SEND } from 'store/actionTypes/contacts';
import styles from './ModalContacts.module.css';

const getListItems = (contacts, isEven, onClick) => {
  const items = [];
  for (let i = 0; i < contacts.length; i += 1) {
    const contact = contacts[i];

    if (isEven && Number(contact.id) % 2 === 0 && (contact.last_name || contact.first_name)) {
      items.push(
        <ListGroup.Item key={contact.id} onClick={onClick(i)} className={styles.listItem}>
          {contact.first_name} {contact.last_name}
        </ListGroup.Item>,
      );
    } else if (!isEven && (contact.last_name || contact.first_name)) {
      items.push(
        <ListGroup.Item key={contact.id} onClick={onClick(i)} className={styles.listItem}>
          {contact.first_name} {contact.last_name}
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
    setListItems(getListItems(contactsRedux.contacts, isEvenCheck, onClickContact));
  }, [contactsRedux.contacts, isEvenCheck, onClickContact]);

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

  return (
    <>
      <Modal show={open} onHide={onClose} backdrop="static">
        <Modal.Body>
          <ModalButtons
            onClickFirstButton={onClickFirstButton}
            onClickSecondButton={onClickSecondButton}
            onClickThirdButton={onClickThirdButton}
          />
          <div className={styles.container}>
            {contactsRedux.pending ? (
              <Spinner animation="border" />
            ) : (
              <ListGroup id="listGroup" className={styles.body}>
                <InfiniteScroll
                  scrollableTarget="listGroup"
                  dataLength={contactsRedux.contacts.length}
                  loader={
                    contactsRedux.pendingMore ? (
                      <div className={styles.spinnerContainer}>
                        <Spinner animation="border" />
                      </div>
                    ) : null
                  }
                  hasMore={contactsRedux.contacts.length < contactsRedux.pagination.maxItems}
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
            Color: {contactsRedux.contacts[contactIndex].color} Phone number:{' '}
            {contactsRedux.contacts[contactIndex].phone_number}
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
