import { ReactElement } from "react";
import { Button, Tooltip } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./ContactCTA.module.css";

export function ContactCTA(): ReactElement {
  const handleContactClick = (): void => {
    const ctaName = config.get("HOME.ACTIONS.CONTACT_ME");
    const destination = "#contact";
    analytics.trackCTAClick(ctaName, destination);
    const section = document.querySelector(destination);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Tooltip
      label={config.get("CTAS.CONTACT.DESCRIPTION")}
      position="top"
      withArrow
      openDelay={500}
    >
      <Button
        className={classes.tertiaryButton}
        onClick={handleContactClick}
        leftSection={<Icon name="IconMail" size={16} />}
        variant="light"
      >
        {config.get("HOME.ACTIONS.CONTACT_ME")}
      </Button>
    </Tooltip>
  );
}
