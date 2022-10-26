import React from "react";
import ReactDOM from "react-dom/client";
import ReactRouterProvider from "./routes";
import "./components/fonts/stylesheet.css";
import "./index.css";
import store from "./store/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactRouterProvider />
  </Provider>
);
