import { ReactElement } from "react";
import { Button, Tooltip } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { useSmoothScrollContext } from "@/hooks/SmoothScrollContext";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./ContactCTA.module.css";

export function ContactCTA(): ReactElement {
  const { scrollTo } = useSmoothScrollContext();
  const magneticRef = useMagneticEffect(0.3);

  const handleContactClick = (): void => {
    const ctaName = config.get("HOME.ACTIONS.CONTACT_ME");
    const destination = "#contact";
    analytics.trackCTAClick(ctaName, destination);
    scrollTo(destination, { offset: -60 });
  };

  return (
    <div ref={magneticRef}>
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
        >
          {config.get("HOME.ACTIONS.CONTACT_ME")}
        </Button>
      </Tooltip>
    </div>
  );
}
