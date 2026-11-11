import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Suspense } from "@/components/Common";
import { ErrorPage } from "@/pages/Error/Error.page";
import externalRoutes from "@/pages/External/Router";
import { MainPage } from "@/pages/Main";

const PrivacyPage = lazy(() =>
  import("@/pages/Privacy/Privacy.page").then((m) => ({
    default: m.PrivacyPage,
  }))
);

// TODO: Figure out moving the routes to default config
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: (
      <Suspense>
        <PrivacyPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  ...externalRoutes,
];

export default routes;
