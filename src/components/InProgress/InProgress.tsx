import { ReactElement } from "react";
import { Text, Button } from "@mantine/core";
import { BouncyLoader } from "@/components/Loaders/BouncyLoader";
import classes from "./InProgress.module.css";

export function InProgress(): ReactElement {
  const handleButtonClick = (): void => {
    const section = document.querySelector("#projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Text className={classes.text}>
        This portfolio is a build in progress.
      </Text>
      <BouncyLoader className={classes.loader} />
      <Button className={classes.button} onClick={handleButtonClick}>
        Meanwhile, How about you view my Projects?
      </Button>
    </div>
  );
}
