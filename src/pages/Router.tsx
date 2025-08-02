import { RouteObject, Navigate } from "react-router-dom";
import { ErrorPage } from "./Error/Error.page";
import { MainPage } from "./Main";
import externalRoutes from "./External/Router";

// TODO: Figure out moving the routes to default config
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  ...externalRoutes,
];

export default routes;
