import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import styles from './ModalButtons.module.css';

const ModalButtons = (props) => {
  const { onClickFirstButton, onClickSecondButton, onClickThirdButton } = props;

  return (
    <div className={styles.container}>
      <Button variant="primary" size="lg" onClick={onClickFirstButton}>
        All Contacts
      </Button>
      <Button variant="primary" size="lg" onClick={onClickSecondButton}>
        US Contacts
      </Button>
      <Button variant="primary" size="lg" onClick={onClickThirdButton}>
        Close
      </Button>
    </div>
  );
};

ModalButtons.propTypes = {
  onClickFirstButton: PropTypes.func.isRequired,
  onClickSecondButton: PropTypes.func.isRequired,
  onClickThirdButton: PropTypes.func.isRequired,
};

export default ModalButtons;
