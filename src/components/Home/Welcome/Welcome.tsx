import { ReactElement } from "react";
import { Text, Title } from "@mantine/core";

import config from "@/utils/Config";

import classes from "./Welcome.module.css";

export function Welcome(): ReactElement {
  return (
    <div>
      <Title className={classes.title}>
        {config.get("HOME.TITLE.GREETING")}{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "yellow", to: "red" }}
        >
          {config.get("HOME.TITLE.NAME")}
        </Text>
      </Title>
      <Text size="lg" className={classes.subtitle}>
        {config.get("HOME.TITLE.SUBTITLE")}
      </Text>
    </div>
  );
}
