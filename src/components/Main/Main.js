import React, { useCallback, useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import ModalContainer from 'components/ModalContainer/ModalContainer';
import ModalButtons from 'components/ModalButtons/ModalButtons';
import customAxios from 'customaxios/axios';
import styles from './Main.module.css';

const Main = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);

  const [allCountriesContacts, setAllCountriesContacts] = useState([]);

  const toggleIsModalOpen = useCallback((setState, state) => () => setState(!state), []);

  const closeAllModals = useCallback(() => {
    setIsModalAOpen(false);
    setIsModalBOpen(false);
  }, []);

  useEffect(() => {
    if (isModalAOpen) {
      customAxios
        .get('/contacts.json', {
          params: {
            companyId: 171,
          },
        })
        .then((response) => {
          console.log('response.data.contacts', response.data.contacts);
          setAllCountriesContacts(response.data.contacts);
        });
    }
  }, [isModalAOpen]);

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
          <ListGroup defaultActiveKey="#link1">
            {allCountriesContacts.map((contact) => (
              <ListGroup.Item action href="#link1">
                {contact.first_name} {contact.last_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ModalButtons
            onClickFirstButton={toggleIsModalOpen(setIsModalAOpen, false)}
            onClickSecondButton={toggleIsModalOpen(setIsModalBOpen, false)}
            onClickThirdButton={closeAllModals}
          />
        </ModalContainer>
        <ModalContainer open={isModalBOpen} onClose={closeAllModals}>
          <ModalButtons
            onClickFirstButton={toggleIsModalOpen(setIsModalAOpen, false)}
            onClickSecondButton={toggleIsModalOpen(setIsModalBOpen, false)}
            onClickThirdButton={closeAllModals}
          />
        </ModalContainer>
      </div>
    </>
  );
};

Main.propTypes = {};

export default Main;
