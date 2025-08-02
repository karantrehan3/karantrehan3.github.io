import { ReactElement, lazy } from "react";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { Suspense } from "../../components/Suspense/Suspense";
import ZigZag from "../../components/Dividers/ZigZag";
import classes from "./index.module.css";

const HomePage = lazy(() => import("../Home/Home.page"));
const ProjectsPage = lazy(() => import("../Projects/Projects.page"));
const ContactPage = lazy(() => import("../Contact/Contact.page"));

export function MainPage(): ReactElement {
  return (
    <PageLayout>
      <div className={classes.section} id="home">
        <Suspense>
          <HomePage />
        </Suspense>
      </div>
      <ZigZag />
      <div className={classes.section} id="projects">
        <Suspense>
          <ProjectsPage />
        </Suspense>
      </div>
      <ZigZag />
      <div className={classes.section} id="contact">
        <Suspense>
          <ContactPage />
        </Suspense>
      </div>
    </PageLayout>
  );
}
