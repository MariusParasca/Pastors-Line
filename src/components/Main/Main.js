import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

import ModalContainer from 'components/ModalContainer/ModalContainer';
import styles from './Main.module.css';

const Main = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);

  const toggleIsModalOpen = useCallback(() => (state, setState) => setState(!state), []);

  return (
    <>
      <div className={styles.container}>
        <Button
          className={styles.firstButton}
          variant="primary"
          size="lg"
          onClick={toggleIsModalOpen(isModalAOpen, setIsModalAOpen)}
        >
          Button A
        </Button>
        <Button variant="secondary" size="lg" onClick={toggleIsModalOpen(isModalBOpen, setIsModalBOpen)}>
          Button B
        </Button>
      </div>
      <ModalContainer />
    </>
  );
};

Main.propTypes = {};

export default Main;
