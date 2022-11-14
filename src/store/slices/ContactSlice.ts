import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IContact } from "../../models/ContactModels";

interface IContactReducer {
  contacts: IContact[];
  searchContacts: string;
  currentContact: IContact;
}

const initialState: IContactReducer = {
  contacts: [],
  searchContacts: "",
  currentContact: {} as IContact,
};

export const contactsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<IContact[]>) {
      state.contacts = action.payload;
    },
    setSearchString(state, action: PayloadAction<string>) {
      state.searchContacts = action.payload;
    },
    setCurrentContact(state, action: PayloadAction<IContact>) {
      state.currentContact = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const contactsActions = contactsSlice.actions;
