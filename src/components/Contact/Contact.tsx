import { Avatar, Button, Comment } from "antd";
import React from "react";

import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import { IContact } from "../../models/ContactModels";
import s from "./Contact.module.scss";

interface IProps {
  data: IContact;
  deleteContact: (id: number) => void;
  setCurrentContactInStore: (data: IContact) => void;
}

const avatar = "https://joeschmoe.io/api/v1/random"

export const Contact = React.memo(
  ({ data, deleteContact, setCurrentContactInStore }: IProps) => {
    return (
      <Comment
        className={s.comment}
        author={
          <p>
            {data.firstName} {data.lastName}
          </p>
        }
        avatar={
          <Avatar
            className={s.avatar}
            src={avatar}
            alt={`${data.firstName} ${data.lastName}`}
          />
        }
        content={
          <div className={s.comment__content}>
            <div className={s.comment__content_left}>
              <p>Country: {data.country}</p>
              <p>City: {data.city}</p>
            </div>
            <div className={s.comment__content_right}>
              <Button onClick={() => setCurrentContactInStore(data)}>
                <EditOutlined />
              </Button>
              <Button onClick={() => deleteContact(data.id)} danger>
                <CloseOutlined />
              </Button>
            </div>
          </div>
        }
        datetime={data.date}
      />
    );
  }
);
