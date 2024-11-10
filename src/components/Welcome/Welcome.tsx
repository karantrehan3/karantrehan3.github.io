import {  Text, Title } from "@mantine/core";
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
          Karan Trehan
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This portfolio is a build in progress.
      </Text>
    </>
  );
}
