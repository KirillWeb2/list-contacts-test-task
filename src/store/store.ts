import { authAPI } from "./../services/AuthService";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { contactsAPI } from "../services/ContactsService";
import { contactsReducer } from "./slices/ContactSlice";
import { userReducer } from "./slices/UserSlice";

const rootReducer = combineReducers({
  contactsReducer,
  userReducer,
  [contactsAPI.reducerPath]: contactsAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(contactsAPI.middleware, authAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
