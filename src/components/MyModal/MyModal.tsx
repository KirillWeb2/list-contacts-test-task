import React from "react";

import { ModalContext } from "../../context/ModalContext";
import s from "./MyModal.module.scss";

interface Props {
  children: React.ReactNode;
}

export const MyModal: React.FC<Props> = ({ children }) => {
  const { updateModalState, modalType, isVisible } =
    React.useContext(ModalContext);

  return (
    <div className={[s.wrapper, isVisible ? s.active : null].join(" ")}>
      <div
        onClick={() => updateModalState(modalType, false)}
        className={[s.backdrop].join(" ")}
      ></div>
      <div className={[s.content].join(" ")}>{children}</div>
    </div>
  );
};
