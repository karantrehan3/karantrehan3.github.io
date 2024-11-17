import { ReactElement } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { HomePage } from "./pages/Home/Home.page";
import { ProjectsPage } from "./pages/Projects/Projects.page";
import { ContactPage } from "./pages/Contact/Contact.page";
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
    element: <ProjectsPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
