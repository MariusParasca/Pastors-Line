import React, { useCallback, useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import ModalContacts from 'components/ModalContacts/ModalContacts';
import ModalButtons from 'components/ModalButtons/ModalButtons';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_CONTACTS_SEND } from 'store/actionTypes/contacts';
import styles from './Main.module.css';

const Main = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);

  const dispatch = useDispatch();
  const contactsRedux = useSelector((state) => state.contacts);

  const toggleIsModalOpen = useCallback((setState, state) => () => setState(!state), []);

  const closeModalAOpenB = useCallback(() => {
    setIsModalAOpen(false);
    setIsModalBOpen(true);
  }, []);

  const closeModalBOpenA = useCallback(() => {
    setIsModalAOpen(true);
    setIsModalBOpen(false);
  }, []);

  const closeAllModals = useCallback(() => {
    setIsModalAOpen(false);
    setIsModalBOpen(false);
  }, []);

  useEffect(() => {
    if (isModalAOpen) {
      dispatch({ type: FETCH_CONTACTS_SEND, queryParams: { companyId: 171 } });
    }
  }, [dispatch, isModalAOpen]);

  useEffect(() => {
    if (isModalBOpen) {
      dispatch({ type: FETCH_CONTACTS_SEND, queryParams: { companyId: 171, countryId: 226 } });
    }
  }, [dispatch, isModalBOpen]);

  console.log('contactsRedux', contactsRedux);

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
        <ModalContacts
          key="allContacts"
          open={isModalAOpen}
          onClose={closeAllModals}
          onClickFirstButton={closeModalBOpenA}
          onClickSecondButton={closeModalAOpenB}
          onClickThirdButton={closeAllModals}
        />
        <ModalContacts
          kye="UsContacts"
          open={isModalBOpen}
          onClose={closeAllModals}
          onClickFirstButton={closeModalBOpenA}
          onClickSecondButton={closeModalAOpenB}
          onClickThirdButton={closeAllModals}
        />
      </div>
    </>
  );
};

Main.propTypes = {};

export default Main;
