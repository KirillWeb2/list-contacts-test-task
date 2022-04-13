import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { useAuthHook } from '../../hooks/useAuthHook'
import { IContact } from '../../models/ContactModels'
import { contactsSlice } from '../../store/slices/ContactSlice'
import AddContact from '../AddContact/AddContact'
import s from './ContactsSort.module.scss'

interface IContactsSort {
    searchContacts: string
    pushContact: (data: IContact) => void
    contacts: IContact[]
}

const ContactsSort = ({ searchContacts, pushContact, contacts }: IContactsSort) => {
    const dispatch = useAppDispatch()
    const { logout } = useAuthHook()

    const [modalAdd, setModalAdd] = useState<boolean>(false)
    const cancelModal = () => setModalAdd(!modalAdd)
    const modalOk = (data: IContact) => {
        setModalAdd(false)
        pushContact(data)
    }

    const { getSearchString } = contactsSlice.actions

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(getSearchString(e.currentTarget.value))

    return (
        <div className={s.sort}>
            <Input
                type={"text"}
                placeholder='Поиск'
                value={searchContacts}
                onChange={onChange}
            />
            <Button onClick={cancelModal}>
                Добавить
            </Button>
            <AddContact contacts={contacts} isModalVisible={modalAdd} handleCancel={cancelModal} handleOk={modalOk} />
            <Link to="/">
                <Button danger onClick={logout}>
                    Выйти
                </Button>
            </Link>
        </div>
    )
}

export default ContactsSort