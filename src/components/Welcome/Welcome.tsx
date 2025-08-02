import { ReactElement } from "react";
import { Text, Title } from "@mantine/core";
import config from "@/utils/Config";
import classes from "./Welcome.module.css";

export function Welcome(): ReactElement {
  return (
    <div>
      <Title className={classes.title}>
        Howdy! I'm{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "yellow", to: "red" }}
        >
          {config.get("TITLE.NAME")}
        </Text>
      </Title>
      <Text size="lg" className={classes.subtitle}>
        Senior Software Engineer & AI Enthusiast
      </Text>
    </div>
  );
}
