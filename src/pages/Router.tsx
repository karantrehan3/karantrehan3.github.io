import { RouteObject } from "react-router-dom";

import { ErrorPage } from "@/pages/Error/Error.page";
import externalRoutes from "@/pages/External/Router";
import { MainPage } from "@/pages/Main";
import { PrivacyPage } from "@/pages/Privacy/Privacy.page";

// TODO: Figure out moving the routes to default config
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  ...externalRoutes,
];

export default routes;
