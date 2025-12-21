import { ReactElement } from "react";
import { Group, Text } from "@mantine/core";

import { AboutMeCTA, ContactCTA, ProjectsCTA } from "@/components/Home/CTAs";
import config from "@/utils/Config";

import classes from "./HomeActions.module.css";

export function HomeActions(): ReactElement {
  return (
    <div className={classes.container}>
      <Text className={classes.text}>
        {config.get("HOME.ACTIONS.LET_S_EXPLORE")}
      </Text>

      <Group className={classes.buttonGroup} gap="md">
        <AboutMeCTA />
        <ProjectsCTA />
        <ContactCTA />
      </Group>
    </div>
  );
}
