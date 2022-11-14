import React from "react";

import s from "./Error404.module.scss";

const Error404: React.FC = () => {
  return (
    <div className={s.centered}>
      <div className={s.error}>
        <h1 className={s.error__title}>Error404</h1>
        <p className={s.error__description}>Page not found</p>
      </div>
    </div>
  );
};

export default Error404;
