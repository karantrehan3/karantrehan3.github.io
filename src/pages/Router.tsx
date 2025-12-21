import { RouteObject } from "react-router-dom";

import { ErrorPage } from "@/pages/Error/Error.page";
import externalRoutes from "@/pages/External/Router";
import { MainPage } from "@/pages/Main";

// TODO: Figure out moving the routes to default config
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  ...externalRoutes,
];

export default routes;
