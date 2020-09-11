import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

import ModalContainer from 'components/ModalContainer/ModalContainer';
import ModalButtons from 'components/ModalButtons/ModalButtons';
import styles from './Main.module.css';

const Main = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);

  const toggleIsModalOpen = useCallback((setState, state) => () => setState(!state), []);

  const closeAllModals = useCallback(() => {
    setIsModalAOpen(false);
    setIsModalBOpen(false);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Button
          className={styles.firstButton}
          variant="primary"
          size="lg"
          onClick={toggleIsModalOpen(setIsModalAOpen, isModalAOpen)}
        >
          Button A
        </Button>
        <Button variant="secondary" size="lg" onClick={toggleIsModalOpen(setIsModalBOpen, isModalBOpen)}>
          Button B
        </Button>
        <ModalContainer open={isModalAOpen} onClose={closeAllModals}>
          <ModalButtons />
        </ModalContainer>
        <ModalContainer open={isModalBOpen} onClose={closeAllModals}>
          <ModalButtons />
        </ModalContainer>
      </div>
    </>
  );
};

Main.propTypes = {};

export default Main;
