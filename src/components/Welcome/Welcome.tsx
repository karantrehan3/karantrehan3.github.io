import { Text, Title } from "@mantine/core";
import config from "@/utils/Config";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
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
    </>
  );
}
