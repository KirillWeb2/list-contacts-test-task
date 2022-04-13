import { useCallback } from "react"
import { IContact } from "../models/ContactModels"
import { contactsAPI } from "../services/ContactsService"

export const useContacts = () => {
    const [change, { }] = contactsAPI.useChangeContactsMutation()
    const [del, { }] = contactsAPI.useDeleteContactsMutation()
    const [add, { }] = contactsAPI.useAddContactMutation()

    const pushContact = useCallback(async (newContact: IContact) => {
        await add(newContact)
    }, [])

    const deleteContact = useCallback(async (id: number) => {
        await del({ id })
    }, [])

    const changeContact = useCallback(async (contact: IContact) => {
        await change(contact)
    }, [])


    return {
        pushContact,
        deleteContact,
        changeContact,
    }
}