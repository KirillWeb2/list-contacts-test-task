import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../models/UsersModels";

interface IUserReducer {
  user: IUser;
  isAuth: boolean;
}

const initialState: IUserReducer = {
  user: {} as IUser,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
