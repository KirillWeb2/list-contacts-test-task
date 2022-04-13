import { useEffect, useState } from "react"
import { IContact } from "../models/ContactModels"
import { contactsAPI } from "../services/ContactsService"
import { contactsSlice } from "../store/slices/ContactSlice"
import { useAppDispatch, useAppSelector } from "./ReduxHooks"


export const useSort = () => {
    const dispatch = useAppDispatch()

    const { searchContacts, contacts } = useAppSelector(state => state.contactsReducer)

    const [searchContactsList, setSearchContactsList] = useState<IContact[]>([])

    const { getContacts } = contactsSlice.actions
    const { data: contactsList } = contactsAPI.useGetContactsQuery(5)

    if (contactsList && contactsList.length !== 0) {
        dispatch(getContacts(contactsList))
    }

    useEffect(() => {
        if (searchContacts) {
            const newList = contacts.filter((i: IContact) =>
                i.firstName.toLowerCase().includes(searchContacts.toLowerCase().replace(/\s/g, '')) ||
                    i.lastName.toLowerCase().includes(searchContacts.toLowerCase().replace(/\s/g, '')) ? true : false
            )
            setSearchContactsList(newList)
        } else {
            if (contacts && contacts.length !== 0) {
                setSearchContactsList(contacts)
            }
        }
    }, [searchContacts, contacts])


    return {
        searchContactsList
    }
}