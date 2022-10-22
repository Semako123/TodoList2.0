import React from "react";
import ReactDOM from "react-dom/client";
import ReactRouterProvider from "./routes";
import "./components/fonts/stylesheet.css";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ReactRouterProvider />
  </>
);
