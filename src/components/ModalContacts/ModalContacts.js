/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ModalButtons from 'components/ModalButtons/ModalButtons';
import styles from './ModalContacts.module.css';

const getListItems = (contacts, isEven) => {
  const items = [];
  for (const property in contacts) {
    if (
      Object.prototype.hasOwnProperty.call(contacts, property) &&
      (contacts[property].first_name || contacts[property].last_name)
    ) {
      if (isEven && Number(property) % 2 === 0) {
        items.push(
          <ListGroup.Item key={property}>
            {contacts[property].first_name} {contacts[property].last_name}
          </ListGroup.Item>,
        );
      } else if (!isEven) {
        items.push(
          <ListGroup.Item>
            {contacts[property].first_name} {contacts[property].last_name}
          </ListGroup.Item>,
        );
      }
    }
  }

  return items;
};

const ModalContainer = (props) => {
  const { open, onClose, onClickFirstButton, onClickSecondButton, onClickThirdButton } = props;

  const [isEvenCheck, setIsEvenCheck] = useState(false);
  const [listItems, setListItems] = useState([]);

  const contactsRedux = useSelector((state) => state.contacts);

  useEffect(() => {
    setListItems(getListItems(contactsRedux.contacts, isEvenCheck));
  }, [contactsRedux.contacts, isEvenCheck]);

  const toggleEvenCheck = useCallback(() => {
    setIsEvenCheck(!isEvenCheck);
  }, [isEvenCheck]);

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
            <div>
              <Spinner animation="border" />
            </div>
          ) : (
            <div className={styles.body}>
              <ListGroup>{listItems}</ListGroup>
            </div>
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
};

export default ModalContainer;
