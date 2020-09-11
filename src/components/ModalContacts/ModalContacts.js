/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ModalButtons from 'components/ModalButtons/ModalButtons';
import { FETCH_MORE_CONTACTS_SEND } from 'store/actionTypes/contacts';
import styles from './ModalContacts.module.css';

const getListItems = (contacts, isEven) => {
  const items = [];
  for (const contact of contacts) {
    if (isEven && Number(contact.id) % 2 === 0 && (contact.last_name || contact.first_name)) {
      items.push(
        <ListGroup.Item key={contact.id}>
          {contact.first_name} {contact.last_name}
        </ListGroup.Item>,
      );
    } else if (!isEven && (contact.last_name || contact.first_name)) {
      items.push(
        <ListGroup.Item key={contact.id}>
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

  const contactsRedux = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    setListItems(getListItems(contactsRedux.contacts, isEvenCheck));
  }, [contactsRedux.contacts, isEvenCheck]);

  const toggleEvenCheck = useCallback(() => {
    setIsEvenCheck(!isEvenCheck);
  }, [isEvenCheck]);

  const fetchMoreContacts = useCallback(() => {
    dispatch({
      type: FETCH_MORE_CONTACTS_SEND,
      queryParams: { ...queryParams, page: contactsRedux.pagination.page + 1 },
    });
  }, [contactsRedux.pagination.page, dispatch, queryParams]);

  return (
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
