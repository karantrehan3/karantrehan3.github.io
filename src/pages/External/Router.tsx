import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Suspense } from "@/components/Common";

const Header = lazy(() => import("@/pages/External/Header/Header.page"));

const routes: RouteObject[] = [
  {
    path: "/external",
    children: [
      {
        path: "/external/header",
        element: (
          <Suspense>
            <Header />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
