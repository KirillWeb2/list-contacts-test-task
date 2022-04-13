import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Comment } from 'antd'
import React from 'react'
import { IContact } from '../../../models/ContactModels'
import s from './Contact.module.scss'

interface IFunction {
    data: IContact
    deleteContact: (id: number) => void
    getMeOneContact: (data: IContact) => void
}

const Contact = ({ data, deleteContact, getMeOneContact }: IFunction) => {
    return (
        <Comment
            className={s.comment}
            author={<p>{data.firstName} {data.lastName}</p>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={`${data.firstName} ${data.lastName}`} />}
            content={
                <div className={s.comment__content}>
                    <div className={s.comment__content_left}>
                        <p>Country: {data.country}</p>
                        <p>City: {data.city}</p>
                    </div>
                    <div className={s.comment__content_right}>
                        <Button onClick={() => getMeOneContact(data)}><EditOutlined /></Button>
                        <Button
                            onClick={() => deleteContact(data.id)}
                            danger
                        >
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
            }
            datetime={data.date}
        />
    )
}

export default React.memo(Contact)