import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginRoute from "./auth.routes";
import HomeRoute from "./home.routes";

const router = createBrowserRouter([...LoginRoute, ...HomeRoute]);

const ReactRouterProvider = () => {
  return <RouterProvider router={router} />;
};
export default ReactRouterProvider;
