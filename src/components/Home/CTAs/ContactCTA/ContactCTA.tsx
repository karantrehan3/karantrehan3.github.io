import { ReactElement } from "react";
import { Button, Tooltip } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import config from "@/utils/Config";

import classes from "./ContactCTA.module.css";

export function ContactCTA(): ReactElement {
  const handleContactClick = (): void => {
    const section = document.querySelector("#contact");
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
