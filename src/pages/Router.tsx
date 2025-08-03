import { RouteObject } from "react-router-dom";

import { ErrorPage } from "./Error/Error.page";
import externalRoutes from "./External/Router";
import { MainPage } from "./Main";

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
