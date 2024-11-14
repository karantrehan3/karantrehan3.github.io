import { Header } from "@/components/Header/Header";
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

export function ProjectsPage() {
  const projectCards: ProjectCardInfo[] = config.get("PROJECTS.CARDS");

  return (
    <div className={classes.pageContainer}>
      <Header />
      <div className={classes.cardsContainer}>
        {projectCards.map((info, index) => (
          <Card {...info} key={index} />
        ))}
      </div>
    </div>
  );
}
