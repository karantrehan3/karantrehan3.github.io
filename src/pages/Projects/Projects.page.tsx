import { ReactElement } from "react";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import { Card } from "@/components/Card/Card";
import config from "@/utils/Config";
import classes from "./Projects.module.css";

interface ProjectCardInfo {
  imageSource: string;
  imageAlt?: string;
  title: string;
  description: string;
  link: string;
}

export function ProjectsPage(): ReactElement {
  const projectCards: ProjectCardInfo[] = config.get("PROJECTS.CARDS");

  return (
    <PageLayout>
      <div className={classes.cardsContainer}>
        {projectCards.map((info, index) => (
          <Card {...info} key={index} />
        ))}
      </div>
    </PageLayout>
  );
}
