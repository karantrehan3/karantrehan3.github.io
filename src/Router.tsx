import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { HomePage } from "./pages/Home/Home.page";
import { ErrorPage } from "./pages/Error/Error.page";

// TODO: Figure out moving the routes to default config
const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <HomePage />,
  },
  {
    path: "/projects",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
