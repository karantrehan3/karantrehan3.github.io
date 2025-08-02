import { ReactElement } from "react";
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

export default function ProjectsPage(): ReactElement {
  const projectCards: ProjectCardInfo[] = config.get("PROJECTS.CARDS");

  return (
    <div className={classes.cardsContainer}>
      {projectCards.map((info, index) => (
        <Card {...info} key={index} />
      ))}
    </div>
  );
}
