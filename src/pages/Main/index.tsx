import { lazy, ReactElement, ReactNode } from "react";

import { PageLayout, Suspense, ZigZag } from "@/components/Common";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import classes from "./index.module.css";

const HomePage = lazy(() => import("@/pages/Home/Home.page"));
const AboutPage = lazy(() => import("@/pages/About/About.page"));
const ProjectsPage = lazy(() => import("@/pages/Projects/Projects.page"));
const ContactPage = lazy(() => import("@/pages/Contact/Contact.page"));

function RevealSection({ children }: { children: ReactNode }): ReactElement {
  const [isRevealed, ref] = useScrollReveal({ threshold: 0.05 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={isRevealed ? classes.revealed : classes.hidden}
    >
      {children}
    </div>
  );
}

export function MainPage(): ReactElement {
  return (
    <PageLayout>
      <div id="main-content">
        <section className={classes.section} id="home" aria-label="Home">
          <Suspense>
            <HomePage />
          </Suspense>
        </section>
        <ZigZag />
        <section className={classes.section} id="about" aria-label="About">
          <RevealSection>
            <Suspense>
              <AboutPage />
            </Suspense>
          </RevealSection>
        </section>
        <ZigZag />
        <section
          className={classes.section}
          id="projects"
          aria-label="Projects"
        >
          <RevealSection>
            <Suspense>
              <ProjectsPage />
            </Suspense>
          </RevealSection>
        </section>
        <ZigZag />
        <section className={classes.section} id="contact" aria-label="Contact">
          <RevealSection>
            <Suspense>
              <ContactPage />
            </Suspense>
          </RevealSection>
        </section>
      </div>
    </PageLayout>
  );
}
