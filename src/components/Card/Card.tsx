import { useState, ReactElement } from "react";
import { Card as OgCard, Image, Text, Group, Loader } from "@mantine/core";
import classes from "./Card.module.css";

interface CardProps {
  imageSource: string;
  imageAlt?: string;
  title: string;
  description: string;
  link: string;
}

export function Card({
  imageSource,
  imageAlt = "none",
  title,
  description,
  link,
}: CardProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <OgCard className={classes.card} onClick={() => window.open(link, "_self")}>
      <OgCard.Section>
        {loading && (
          <div className={classes.center}>
            <Loader className={classes.loader} type="dots" size="xl" />
          </div>
        )}
        <Image
          src={imageSource}
          alt={imageAlt}
          className={loading ? classes.hidden : classes.img}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </OgCard.Section>

      <Group className={classes.group}>
        <Text className={classes.title}>{title}</Text>
      </Group>

      <Text className={classes.description}>{description}</Text>
    </OgCard>
  );
}
