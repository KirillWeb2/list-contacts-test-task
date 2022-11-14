import React from "react";
import { IModalFormContact } from "../models/ContactModels";

export interface IModalContext {
  title: string;
  isVisible: boolean;
  modalType: "create" | "update";
  updateModalState: (modalType: "create" | "update", value?: boolean) => void;
  successHandler: (data: IModalFormContact) => void;
}

export const ModalContext = React.createContext<IModalContext>({
  title: "",
  modalType: "create",
  successHandler: () => null,
  updateModalState: () => null,
  isVisible: false,
});
