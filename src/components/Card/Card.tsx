import { Card as OgCard, Image, Text, Group } from "@mantine/core";
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
}: CardProps) {
  return (
    <OgCard className={classes.card} onClick={() => window.open(link, "_self")}>
      <OgCard.Section>
        <Image src={imageSource} alt={imageAlt} className={classes.img} />
      </OgCard.Section>

      <Group className={classes.group}>
        <Text className={classes.title}>{title}</Text>
      </Group>

      <Text className={classes.description}>{description}</Text>
    </OgCard>
  );
}
