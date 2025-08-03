import { ReactElement } from "react";
import { Button, Group, Text } from "@mantine/core";
import { IconFolder, IconUser } from "@tabler/icons-react";

import config from "@/utils/Config";

import classes from "./HomeActions.module.css";

export function HomeActions(): ReactElement {
  const handleAboutClick = (): void => {
    const section = document.querySelector("#about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProjectsClick = (): void => {
    const section = document.querySelector("#projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={classes.container}>
      <Text className={classes.text}>
        {config.get("HOME.ACTIONS.LET_S_EXPLORE")}
      </Text>

      <Group className={classes.buttonGroup} gap="md">
        <Button
          className={classes.primaryButton}
          onClick={handleAboutClick}
          leftSection={<IconUser size={16} />}
        >
          {config.get("HOME.ACTIONS.LEARN_ABOUT_ME")}
        </Button>
        <Button
          className={classes.secondaryButton}
          onClick={handleProjectsClick}
          leftSection={<IconFolder size={16} />}
          variant="outline"
        >
          {config.get("HOME.ACTIONS.VIEW_PROJECTS")}
        </Button>
      </Group>
    </div>
  );
}
