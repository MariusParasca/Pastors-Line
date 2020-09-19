import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { PageRoute } from 'utils/routes';
import styles from './ModalButtons.module.css';

const ModalButtons = (props) => {
  const { onClickFirstButton, onClickSecondButton, onClickThirdButton } = props;

  return (
    <div className={styles.container}>
      <NavLink to={PageRoute.modalA} onClick={onClickFirstButton}>
        <Button variant="primary" size="lg">
          All Contacts
        </Button>
      </NavLink>
      <NavLink to={PageRoute.modalB} onClick={onClickSecondButton}>
        <Button variant="secondary" size="lg">
          US Contacts
        </Button>
      </NavLink>
      <NavLink to={PageRoute.home}>
        <Button className={styles.closeButton} size="lg" onClick={onClickThirdButton}>
          Close
        </Button>
      </NavLink>
    </div>
  );
};

ModalButtons.propTypes = {
  onClickFirstButton: PropTypes.func.isRequired,
  onClickSecondButton: PropTypes.func.isRequired,
  onClickThirdButton: PropTypes.func.isRequired,
};

export default ModalButtons;
