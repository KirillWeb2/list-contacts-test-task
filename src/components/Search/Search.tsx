import { Button, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { useActions } from "../../hooks/ReduxHooks";
import { useAuthHook } from "../../hooks/useAuthHook";
import { useLazySearchContactsQuery } from "../../services/ContactsService";
import s from "./Search.module.scss";

interface ISearch {
  searchContacts: string;
  updateModalState: (modalType: "create" | "update") => void;
}

export const Search = React.memo(
  ({ searchContacts, updateModalState }: ISearch) => {
    const { logout } = useAuthHook();

    const { setSearchString, setContacts } = useActions();

    const [search, { data }] = useLazySearchContactsQuery();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setSearchString(value);
      if (value) search(value);
    };

    React.useEffect(() => {
      if (data) setContacts(data);
    }, [data]);

    return (
      <div className={s.sort}>
        <Input
          type={"text"}
          placeholder="Поиск"
          value={searchContacts}
          onChange={onChange}
        />
        <Button onClick={() => updateModalState("create")}>Добавить</Button>
        <Link to="/">
          <Button danger onClick={logout}>
            Выйти
          </Button>
        </Link>
      </div>
    );
  }
);
