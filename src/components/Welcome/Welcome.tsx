import { Text, Title } from "@mantine/core";
import config from "@/utils/Config";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <div>
      <Title className={classes.title}>
        Howdy! I am{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "yellow", to: "red" }}
        >
          {config.get("TITLE.NAME")}
        </Text>
      </Title>
    </div>
  );
}
