import { ReactElement } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "./pages/Router";

const router = createHashRouter(routes);

export function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
