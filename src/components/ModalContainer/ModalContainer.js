import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal } from 'react-bootstrap';

import styles from './ModalContainer.module.css';

const ModalContainer = (props) => {
  const { open, onClose, children } = props;

  return (
    <Modal show={open} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Form.Check type="checkbox" label="Only even" />
      </Modal.Footer>
    </Modal>
  );
};

ModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalContainer;
