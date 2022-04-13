import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangeContact from '../../components/ChangeContact/ChangeContact'
import ContactsSort from '../../components/ContactsSort/ContactsSort'
import Contact from '../../components/UI/Contact/Contact'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { useAuthHook } from '../../hooks/useAuthHook'
import { useContacts } from '../../hooks/useContacts'
import { useSort } from '../../hooks/useSort'
import { IContact } from '../../models/ContactModels'
import { contactsSlice } from '../../store/slices/ContactSlice'
import s from './Contacts.module.scss'


const Contacts = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { changeContact, deleteContact, pushContact } = useContacts()
    const { searchContactsList } = useSort()


    const { isAuthUser } = useAppSelector(state => state.userReducer)
    const { searchContacts, contacts, changeContactItem } = useAppSelector(state => state.contactsReducer)

    
    const { getChangeContact } = contactsSlice.actions
    const [changeContactModal, setChangeContactModal] = useState<boolean>(false)
    const close = () => setChangeContactModal(!changeContactModal)
    const send = (data: IContact) => changeContact(data)

    const getMeOneContact = (data: IContact) => {
        dispatch(getChangeContact(data))
        close()
    }

    useEffect(() => {
        if (!isAuthUser) {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <ContactsSort contacts={contacts} pushContact={pushContact} searchContacts={searchContacts} />
            <ChangeContact
                isModalVisible={changeContactModal}
                handleCancel={close}
                handleOk={send}
                contact={changeContactItem}
            />
            <div className={s.list}>
                {searchContactsList && searchContactsList.map((i: IContact) =>
                    <Contact
                        getMeOneContact={getMeOneContact}
                        deleteContact={deleteContact}
                        key={i.id}
                        data={i}
                    />
                )}
            </div>
        </div>
    )
}

export default Contacts