import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import ModalContacts from 'components/ModalContacts/ModalContacts';
import { useDispatch } from 'react-redux';
import { FETCH_CONTACTS_SEND, RESET_CONTACTS } from 'store/actionTypes/contacts';
import styles from './Main.module.css';

const Main = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);
  const [queryParams, setQueryParams] = useState({});

  const dispatch = useDispatch();

  const toggleIsModalOpen = useCallback((setState, state) => () => setState(!state), []);

  const closeModalAOpenB = useCallback(() => {
    if (isModalAOpen) {
      setIsModalAOpen(false);
      setIsModalBOpen(true);
      dispatch({ type: RESET_CONTACTS });
    }
  }, [dispatch, isModalAOpen]);

  const closeModalBOpenA = useCallback(() => {
    if (isModalBOpen) {
      setIsModalAOpen(true);
      setIsModalBOpen(false);
      dispatch({ type: RESET_CONTACTS });
    }
  }, [dispatch, isModalBOpen]);

  const closeAllModals = useCallback(() => {
    setIsModalAOpen(false);
    setIsModalBOpen(false);
    dispatch({ type: RESET_CONTACTS });
  }, [dispatch]);

  useEffect(() => {
    if (isModalAOpen) {
      const query = { companyId: 171 };
      setQueryParams(query);
      dispatch({ type: FETCH_CONTACTS_SEND, queryParams: query });
    }
  }, [dispatch, isModalAOpen]);

  useEffect(() => {
    if (isModalBOpen) {
      const query = { companyId: 171, countryId: 226 };
      setQueryParams(query);
      dispatch({ type: FETCH_CONTACTS_SEND, queryParams: query });
    }
  }, [dispatch, isModalBOpen]);

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
          queryParams={queryParams}
        />
        <ModalContacts
          kye="UsContacts"
          open={isModalBOpen}
          onClose={closeAllModals}
          onClickFirstButton={closeModalBOpenA}
          onClickSecondButton={closeModalAOpenB}
          onClickThirdButton={closeAllModals}
          queryParams={queryParams}
        />
      </div>
    </>
  );
};

Main.propTypes = {};

export default Main;
