import React from "react";

import { IContact } from "../models/ContactModels";
import {
  useAddContactMutation,
  useChangeContactsMutation,
  useDeleteContactsMutation,
  useGetContactsQuery,
} from "../services/ContactsService";
import { useActions } from "./ReduxHooks";

export const useContacts = () => {
  const [change, {}] = useChangeContactsMutation();
  const [del, {}] = useDeleteContactsMutation();
  const [add, {}] = useAddContactMutation();

  const { data } = useGetContactsQuery();

  const { setContacts } = useActions();

  const pushContactOnServer = React.useCallback(async (newContact: IContact) => {
    await add(newContact);
  }, []);

  const deleteContactOnServer = React.useCallback(async (id: number) => {
    await del({ id });
  }, []);

  const changeContactOnServer = React.useCallback(async (contact: IContact) => {
    await change(contact);
  }, []);

  React.useEffect(() => {
    if (data) setContacts(data);
  }, [data]);

  return {
    pushContactOnServer,
    deleteContactOnServer,
    changeContactOnServer,
  };
};
