import { ReactElement } from "react";
import { Button, Tooltip } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./AboutMeCTA.module.css";

export function AboutMeCTA(): ReactElement {
  const handleAboutClick = (): void => {
    const ctaName = config.get("HOME.ACTIONS.LEARN_ABOUT_ME");
    const destination = "#about";
    analytics.trackCTAClick(ctaName, destination);
    const section = document.querySelector(destination);
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
        leftSection={<Icon name="IconUser" size={16} />}
      >
        {config.get("HOME.ACTIONS.LEARN_ABOUT_ME")}
      </Button>
    </Tooltip>
  );
}
