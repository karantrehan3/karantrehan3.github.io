import { ReactElement } from "react";
import { Title, Text } from "@mantine/core";
import classes from "./AboutHeader.module.css";

interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

export function AboutHeader({
  title,
  subtitle,
}: AboutHeaderProps): ReactElement {
  return (
    <div className={classes.headerSection}>
      <div className={classes.header}>
        <Title order={1} className={classes.mainTitle}>
          {title}
        </Title>
        <Text size="lg" className={classes.subtitle}>
          {subtitle}
        </Text>
      </div>
    </div>
  );
}
