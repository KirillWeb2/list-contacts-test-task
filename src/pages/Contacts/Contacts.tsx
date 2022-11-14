import React from "react";
import { useNavigate } from "react-router-dom";

import { Contact } from "../../components/Contact/Contact";
import { ModalContactManagement } from "../../components/ModalContactManagement/ModalContactManagement";
import { MyModal } from "../../components/MyModal/MyModal";
import { Search } from "../../components/Search/Search";
import { ModalContext } from "../../context/ModalContext";
import { useActions, useAppSelector } from "../../hooks/ReduxHooks";
import { useContacts } from "../../hooks/useContacts";
import { IContact, IModalFormContact } from "../../models/ContactModels";
import s from "./Contacts.module.scss";

const Contacts: React.FC = () => {
  const [isVisibleUpdate, setIsVisibleUpdate] = React.useState<boolean>(false);
  const [isVisibleCreate, setIsVisibleCreate] = React.useState<boolean>(false);

  const { isAuth } = useAppSelector((state) => state.userReducer);

  const { contacts, searchContacts, currentContact } = useAppSelector(
    (state) => state.contactsReducer
  );

  const navigate = useNavigate();

  const { setCurrentContact } = useActions();

  const { deleteContactOnServer, changeContactOnServer, pushContactOnServer } =
    useContacts();

  const updateModalState = React.useCallback(
    (modalType: "create" | "update", value?: boolean) => {
      if (modalType === "update") {
        setIsVisibleUpdate(value === undefined ? !isVisibleUpdate : value);
      }
      if (modalType === "create") {
        setIsVisibleCreate(value === undefined ? !isVisibleCreate : value);
      }
    },
    [isVisibleUpdate, isVisibleCreate]
  );

  const updateContact = React.useCallback(
    (contact: IModalFormContact) => {
      changeContactOnServer({
        ...contact,
        id: currentContact.id,
        date: currentContact.date,
      });
    },
    [currentContact]
  );

  const createContact = React.useCallback(
    (contact: IModalFormContact) => {
      const newContact: IContact = {
        ...contact,
        id: contacts[contacts.length - 1].id + 1,
        date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`,
      };

      pushContactOnServer(newContact);
    },
    [contacts]
  );

  const setCurrentContactInStore = React.useCallback((data: IContact) => {
    setCurrentContact(data);
    updateModalState("update");
  }, []);

  const deleteContact = React.useCallback((id: number) => {
    deleteContactOnServer(id);
  }, []);

  React.useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth]);

  return (
    <>
      <Search
        searchContacts={searchContacts}
        updateModalState={updateModalState}
      />
      <div className={s.list}>
        {contacts &&
          contacts.map((i: IContact) => (
            <Contact
              setCurrentContactInStore={setCurrentContactInStore}
              deleteContact={deleteContact}
              key={i.id}
              data={i}
            />
          ))}
      </div>
      <ModalContext.Provider
        value={{
          isVisible: isVisibleUpdate,
          modalType: "update",
          successHandler: updateContact,
          title: "Обновление контакта",
          updateModalState,
        }}
      >
        <MyModal>
          <ModalContactManagement />
        </MyModal>
      </ModalContext.Provider>
      <ModalContext.Provider
        value={{
          isVisible: isVisibleCreate,
          modalType: "create",
          successHandler: createContact,
          title: "Создание контакта",
          updateModalState,
        }}
      >
        <MyModal>
          <ModalContactManagement />
        </MyModal>
      </ModalContext.Provider>
    </>
  );
};

export default Contacts;
