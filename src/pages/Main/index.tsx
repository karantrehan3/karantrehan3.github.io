import { FC, lazy, ReactElement, ReactNode } from "react";

import { PageLayout, Suspense, ZigZag } from "@/components/Common";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import classes from "./index.module.css";

const HomePage = lazy(() => import("@/pages/Home/Home.page"));
const AboutPage = lazy(() => import("@/pages/About/About.page"));
const ProjectsPage = lazy(() => import("@/pages/Projects/Projects.page"));
const ContactPage = lazy(() => import("@/pages/Contact/Contact.page"));

interface RevealSectionProps {
  children: ReactNode;
  id: string;
  label: string;
  delay?: number;
}

const RevealSection: FC<RevealSectionProps> = ({
  children,
  id,
  label,
  delay = 0,
}) => {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.08 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${classes.section} ${isRevealed ? classes.revealed : classes.hidden}`}
      id={id}
      aria-label={label}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
};

export function MainPage(): ReactElement {
  return (
    <PageLayout>
      <div id="main-content">
        <RevealSection id="home" label="Home">
          <Suspense>
            <HomePage />
          </Suspense>
        </RevealSection>
        <ZigZag />
        <RevealSection id="about" label="About Me" delay={100}>
          <Suspense>
            <AboutPage />
          </Suspense>
        </RevealSection>
        <ZigZag />
        <RevealSection id="projects" label="Projects" delay={100}>
          <Suspense>
            <ProjectsPage />
          </Suspense>
        </RevealSection>
        <ZigZag />
        <RevealSection id="contact" label="Contact" delay={100}>
          <Suspense>
            <ContactPage />
          </Suspense>
        </RevealSection>
      </div>
    </PageLayout>
  );
}
