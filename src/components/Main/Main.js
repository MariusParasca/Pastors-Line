import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import ModalContacts from 'components/ModalContacts/ModalContacts';
import { useDispatch } from 'react-redux';
import { FETCH_CONTACTS_SEND, RESET_CONTACTS } from 'store/actionTypes/contacts';
import { NavLink, Route, Switch } from 'react-router-dom';
import { PageRoute } from 'utils/routes';
import './Main.scss';

// I didn't changed the URL on modal openings because I do not see the logic in it...
/// If I could get the opportunity to answer questions

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
      <div className="Main-container">
        <NavLink to={PageRoute.modalA} onClick={toggleIsModalOpen(setIsModalAOpen, isModalAOpen)}>
          <Button className="Main-firstButton" size="lg">
            Button A
          </Button>
        </NavLink>
        <NavLink to={PageRoute.modalB} onClick={toggleIsModalOpen(setIsModalBOpen, isModalBOpen)}>
          <Button className="Main-secondButton" size="lg">
            Button B
          </Button>
        </NavLink>
        <Switch>
          <Route exact path={PageRoute.modalA}>
            <ModalContacts
              key="allContacts"
              open={isModalAOpen}
              onClose={closeAllModals}
              onClickFirstButton={closeModalBOpenA}
              onClickSecondButton={closeModalAOpenB}
              onClickThirdButton={closeAllModals}
              queryParams={queryParams}
            />
          </Route>
          <Route exact path={PageRoute.modalB}>
            <ModalContacts
              kye="UsContacts"
              open={isModalBOpen}
              onClose={closeAllModals}
              onClickFirstButton={closeModalBOpenA}
              onClickSecondButton={closeModalAOpenB}
              onClickThirdButton={closeAllModals}
              queryParams={queryParams}
            />
          </Route>
        </Switch>
      </div>
    </>
  );
};

Main.propTypes = {};

export default Main;
