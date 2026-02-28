import { ReactElement } from "react";
import { Button, Tooltip } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { useSmoothScrollContext } from "@/hooks/SmoothScrollContext";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./ProjectsCTA.module.css";

export function ProjectsCTA(): ReactElement {
  const { scrollTo } = useSmoothScrollContext();
  const magneticRef = useMagneticEffect(0.3);

  const handleProjectsClick = (): void => {
    const ctaName = config.get("HOME.ACTIONS.VIEW_PROJECTS");
    const destination = "#projects";
    analytics.trackCTAClick(ctaName, destination);
    scrollTo(destination, { offset: -60 });
  };

  return (
    <div ref={magneticRef}>
      <Tooltip
        label={config.get("CTAS.PROJECTS.DESCRIPTION")}
        position="top"
        withArrow
        openDelay={500}
      >
        <Button
          className={classes.secondaryButton}
          onClick={handleProjectsClick}
          leftSection={<Icon name="IconFolder" size={16} />}
          variant="outline"
        >
          {config.get("HOME.ACTIONS.VIEW_PROJECTS")}
        </Button>
      </Tooltip>
    </div>
  );
}
