import { Button, Input, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/ReduxHooks";
import { useAuthHook } from "../../hooks/useAuthHook";
import { IForm, IUser } from "../../models/UsersModels";
import {
  useAddUserMutation,
  useLazyGetUserByEmailQuery,
} from "../../services/AuthService";
import s from "./Login.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { login } = useAuthHook();

  const [createUser, {}] = useAddUserMutation();
  const [checkUnique, { data }] = useLazyGetUserByEmailQuery();

  const [form, setForm] = React.useState<IForm>({
    email: "",
    password: "",
  });

  const { setUser, setIsAuth } = useActions();

  const addUserInStore = (user: IUser): void => {
    setUser(user);
    setIsAuth(true);

    login(user);
  };

  const setNewUserAndAuth = (): void => {
    const newUser = { ...form, id: new Date().getTime() };

    createUser(newUser);

    setIsAuth(true);
    setUser(newUser);

    login(newUser);
  };

  const authorizationRequest = (): void => {
    checkUnique(form.email);
  };

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case "email":
        setForm({ ...form, email: e.target.value });
        break;
      case "password":
        setForm({ ...form, password: e.target.value });
        break;
      default:
        return;
    }
  };

  const authorization = (data: IUser[] | undefined): void => {
    if (data?.length !== 0) {
      const user: IUser = data![0];
      addUserInStore(user);
    } else {
      setNewUserAndAuth();
    }

    // сообщить пользователю
    notification["success"]({
      message: "Успешно",
      description: "Вы вошли",
    });

    navigate("/contacts");
  };

  React.useEffect(() => {
    if (data) authorization(data);
  }, [data]);

  return (
    <div className={s.centered}>
      <div className={s.login}>
        <h1>Login</h1>
        <div className={s.login__inputs}>
          <Input
            name="email"
            type={"email"}
            value={form.email}
            onChange={changeForm}
          />
          <Input
            name="password"
            type={"password"}
            value={form.password}
            onChange={changeForm}
          />
        </div>
        <div>
          <Button onClick={authorizationRequest}>Кнопка</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
