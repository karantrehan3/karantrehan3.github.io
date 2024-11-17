import { RouteObject, Navigate } from "react-router-dom";
import { HomePage } from "./Home/Home.page";
import { ProjectsPage } from "./Projects/Projects.page";
import { ContactPage } from "./Contact/Contact.page";
import { ErrorPage } from "./Error/Error.page";
import externalRoutes from "./External/Router";

// TODO: Figure out moving the routes to default config
const routes: RouteObject[] = [
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
  ...externalRoutes,
];

export default routes;
