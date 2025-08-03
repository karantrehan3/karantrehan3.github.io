import { ReactElement } from "react";
import { Container, Stack, Text, Title } from "@mantine/core";

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
  const sectionData = config.get("PROJECTS.SECTION");

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Section Header */}
        <div className={classes.headerSection}>
          <div className={classes.header}>
            <Title order={1} className={classes.mainTitle}>
              {sectionData.TITLE}
            </Title>
            <Text size="lg" className={classes.subtitle}>
              {sectionData.DESCRIPTION}
            </Text>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={classes.cardsContainer}>
          {projectCards.map((info, index) => (
            <Card {...info} key={index} />
          ))}
        </div>
      </Stack>
    </Container>
  );
}
