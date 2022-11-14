import "./index.scss";
import "antd/dist/antd.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { setupStore } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

const store = setupStore();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
