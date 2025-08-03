import { ReactElement } from "react";
import { Button, Tooltip } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

import config from "@/utils/Config";

import classes from "./AboutMeCTA.module.css";

export function AboutMeCTA(): ReactElement {
  const handleAboutClick = (): void => {
    const section = document.querySelector("#about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Tooltip
      label={config.get("CTAS.ABOUT.DESCRIPTION")}
      position="top"
      withArrow
      openDelay={500}
    >
      <Button
        className={classes.primaryButton}
        onClick={handleAboutClick}
        leftSection={<IconUser size={16} />}
      >
        {config.get("HOME.ACTIONS.LEARN_ABOUT_ME")}
      </Button>
    </Tooltip>
  );
}
