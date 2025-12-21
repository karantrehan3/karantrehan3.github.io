import { lazy, ReactElement } from "react";

import { PageLayout, Suspense, ZigZag } from "@/components/Common";

import classes from "./index.module.css";

const HomePage = lazy(() => import("@/pages/Home/Home.page"));
const AboutPage = lazy(() => import("@/pages/About/About.page"));
const ProjectsPage = lazy(() => import("@/pages/Projects/Projects.page"));
const ContactPage = lazy(() => import("@/pages/Contact/Contact.page"));

export function MainPage(): ReactElement {
  return (
    <PageLayout>
      <div className={classes.section} id="home">
        <Suspense>
          <HomePage />
        </Suspense>
      </div>
      <ZigZag />
      <div className={classes.section} id="about">
        <Suspense>
          <AboutPage />
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
