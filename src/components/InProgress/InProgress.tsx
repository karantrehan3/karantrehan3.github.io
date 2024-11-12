import { Text } from "@mantine/core";
import { BouncyLoader } from "../Loaders/BouncyLoader";
import classes from "./InProgress.module.css";

export function InProgress() {
  return (
    <>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This portfolio is a build in progress.
      </Text>
      <br />
      <BouncyLoader className={classes.loader} />
    </>
  );
}
