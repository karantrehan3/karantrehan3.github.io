import { ReactElement, useState } from "react";
import {
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
  inProgress?: boolean;
}

export function Card({
  imageSource,
  imageAlt = "none",
  title,
  description,
  link,
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

      <Group className={classes.group}>
        <Text className={classes.title}>{title}</Text>
      </Group>

      <Text className={classes.description}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Text>
    </OgCard>
  );
}
