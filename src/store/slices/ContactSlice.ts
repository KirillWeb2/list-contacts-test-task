import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContact } from '../../models/ContactModels'

interface IContactReducer {
    contacts: IContact[]
    searchContacts: string
    changeContactItem: IContact
}

const initialState: IContactReducer = {
    contacts: [],
    searchContacts: '',
    changeContactItem: {} as IContact
}

export const contactsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getContacts(state, action: PayloadAction<IContact[]>) {
            state.contacts = action.payload
        },
        getSearchString(state, action: PayloadAction<string>) {
            state.searchContacts = action.payload
        },
        getChangeContact(state, action: PayloadAction<IContact>) {
            state.changeContactItem = action.payload
        },
    },
    extraReducers: {},
})

export default contactsSlice.reducer