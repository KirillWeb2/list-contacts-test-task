import React from "react";
import { useNavigate } from "react-router-dom";

import { IStorage, IUser } from "../models/UsersModels";
import { useLazyGetUserByEmailQuery } from "../services/AuthService";
import { useActions, useAppSelector } from "./ReduxHooks";

export const storageName: string = "authData";

export const useAuthHook = () => {
  const navigate = useNavigate();

  const { isAuth } = useAppSelector((state) => state.userReducer);

  const [getUser, { data }] = useLazyGetUserByEmailQuery();

  const [isLoadingAuth, setIsLoadingAuth] = React.useState<boolean>(false);

  const { setIsAuth, setUser } = useActions();

  const login = React.useCallback((user: IUser) => {
    localStorage.setItem(
      storageName,
      JSON.stringify({
        id: user.id,
        email: user.email,
      })
    );

    setIsAuth(true);
    setIsLoadingAuth(false);
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem(storageName);

    setIsAuth(false);
    setIsLoadingAuth(false);
  }, []);

  React.useEffect(() => {
    const userJson: IStorage = JSON.parse(
      localStorage.getItem(storageName)! as string
    );

    if(userJson) getUser(userJson.email)
  }, []);

  React.useEffect(() => {
    if (data && data.length !== 0) {
      setIsAuth(true);
      setUser(data[0]);
      setIsLoadingAuth(false);

      navigate("/contacts");
    }
  }, [data]);

  return {
    login,
    logout,
    isAuth,
    isLoadingAuth,
  };
};
