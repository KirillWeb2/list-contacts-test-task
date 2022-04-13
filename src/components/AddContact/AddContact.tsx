import { Button, Input, Modal, notification } from 'antd'
import React, { useState } from 'react'
import { IContact } from '../../models/ContactModels'
import s from './AddContact.module.scss'

interface IAddContact {
    isModalVisible: boolean
    handleOk: (data: IContact) => void
    handleCancel: () => void
    contacts: IContact[]
}

const AddContact = ({ isModalVisible, handleOk, handleCancel, contacts }: IAddContact) => {
    const date = new Date()
    const [forma, setForma] = useState<IContact>({
        id: 0,
        city: '',
        country: '',
        date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
        firstName: '',
        lastName: ''
    })

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "firstName":
                setForma({ ...forma, firstName: e.target.value })
                break;
            case "lastName":
                setForma({ ...forma, lastName: e.target.value })
                break;
            case "country":
                setForma({ ...forma, country: e.target.value })
                break;
            case "city":
                setForma({ ...forma, city: e.target.value })
                break;
            default: return
        }
    }

    const send = () => {
        if (forma.city && forma.country && forma.firstName && forma.lastName) {
            handleOk({ ...forma, id: contacts[contacts.length - 1].id + 1 })
        } else {
            notification['error']({
                message: 'Внимание',
                description: 'Заполните все поля',
            })
        }
    }

    return (
        <div className={isModalVisible ? [s.modal, s.active].join(' ') : s.modal} onClick={handleCancel}>
            <div className={isModalVisible ? [s.modal__content, s.active].join(' ') : s.modal__content} onClick={e => e.stopPropagation()}>
                <div className={s.modal__content_middle}>
                    <div className={s.title}>
                        <p>Добавление контакта</p>
                    </div>
                    <div className={s.inputs}>
                        <Input
                            name="firstName"
                            placeholder='Имя'
                            onChange={change}
                            value={forma.firstName}
                        />
                        <Input
                            name="lastName"
                            placeholder='Фамилия'
                            onChange={change}
                            value={forma.lastName}
                        />
                        <Input
                            name="country"
                            placeholder='Страна'
                            onChange={change}
                            value={forma.country}
                        />
                        <Input
                            name="city"
                            placeholder='Город'
                            onChange={change}
                            value={forma.city}
                        />
                    </div>
                </div>
                <div className={s.footer}>
                    <Button danger onClick={handleCancel}>Закрыть</Button>
                    <Button onClick={send}>Добавить</Button>
                </div>
            </div>
        </div>
    )
}

export default AddContact