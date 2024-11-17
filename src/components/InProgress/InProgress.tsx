import { ReactElement } from "react";
import { Text } from "@mantine/core";
import { BouncyLoader } from "@/components/Loaders/BouncyLoader";
import classes from "./InProgress.module.css";

export function InProgress(): ReactElement {
  return (
    <div>
      <Text className={classes.text}>
        This portfolio is a build in progress.
      </Text>
      <BouncyLoader className={classes.loader} />
    </div>
  );
}
