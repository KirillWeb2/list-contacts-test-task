import { Button, Input } from "antd";
import React, { useEffect } from "react";

import { ModalContext } from "../../context/ModalContext";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { IModalFormContact } from "../../models/ContactModels";
import s from "./ModalContactManagement.module.scss";

interface IAddContact {}

export const ModalContactManagement = React.memo(({}: IAddContact) => {
  const { updateModalState, modalType, title, successHandler } =
    React.useContext(ModalContext);

  const { currentContact } = useAppSelector((state) => state.contactsReducer);

  const [form, setForm] = React.useState<IModalFormContact>({
    city: "",
    country: "",
    firstName: "",
    lastName: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "firstName":
        setForm({ ...form, firstName: e.target.value });
        break;
      case "lastName":
        setForm({ ...form, lastName: e.target.value });
        break;
      case "country":
        setForm({ ...form, country: e.target.value });
        break;
      case "city":
        setForm({ ...form, city: e.target.value });
        break;
      default:
        return;
    }
  };

  const send = () => {
    if (form.city && form.country && form.firstName && form.lastName) {
      successHandler(form);
      reset();
    } else {
      alert("Заполните все поля");
    }
  };

  const reset = () => {
    setForm({ city: "", country: "", firstName: "", lastName: "" });
  };

  useEffect(() => {
    setForm({ ...currentContact });
  }, [currentContact]);

  return (
    <div className={s.content}>
      <div className={s.content__top}>
        <div className={s.title}>
          <p>{title}</p>
        </div>
        <div className={s.inputs}>
          <Input
            name="firstName"
            placeholder="Имя"
            onChange={change}
            value={form.firstName}
          />
          <Input
            name="lastName"
            placeholder="Фамилия"
            onChange={change}
            value={form.lastName}
          />
          <Input
            name="country"
            placeholder="Страна"
            onChange={change}
            value={form.country}
          />
          <Input
            name="city"
            placeholder="Город"
            onChange={change}
            value={form.city}
          />
        </div>
      </div>
      <div className={s.content__footer}>
        <Button danger onClick={() => updateModalState(modalType)}>
          Закрыть
        </Button>
        <Button onClick={send}>Изменить</Button>
      </div>
    </div>
  );
});
