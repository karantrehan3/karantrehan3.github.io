import { ReactElement, useState } from "react";
import {
  Badge,
  Container,
  Group,
  Image,
  Loader,
  Card as OgCard,
  Text,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";

import classes from "./Card.module.css";

interface CardProps {
  imageSource: string;
  imageAlt?: string;
  title: string;
  description: string;
  link: string;
  techStack?: string[];
  inProgress?: boolean;
}

export function Card({
  imageSource,
  imageAlt = "none",
  title,
  description,
  link,
  techStack = [],
  inProgress = false,
}: CardProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <OgCard className={classes.card} onClick={() => window.open(link, "_self")}>
      <OgCard.Section className={classes.imageSection}>
        {loading && (
          <div className={classes.center}>
            <Loader className={classes.loader} type="dots" size="xl" />
          </div>
        )}
        {inProgress && (
          <div className={classes.ribbon}>
            <span>🛠️ In Progress</span>
          </div>
        )}
        <Image
          src={imageSource}
          alt={imageAlt}
          className={loading ? classes.hidden : classes.img}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
        <Container className={classes.overlay}>
          <span>Click to check it out</span>
        </Container>
      </OgCard.Section>

      <div className={classes.cardContent}>
        <div className={classes.cardBody}>
          <Group className={classes.group}>
            <Text className={classes.title}>{title}</Text>
          </Group>

          <div className={classes.description}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>

        {techStack.length > 0 && (
          <div className={classes.techStackSection}>
            <Text className={classes.techStackTitle}>Tech Stack:</Text>
            <div className={classes.techStackBadges}>
              {techStack.map((tech, index) => (
                <Badge
                  key={index}
                  className={classes.techBadge}
                  variant="light"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </OgCard>
  );
}
