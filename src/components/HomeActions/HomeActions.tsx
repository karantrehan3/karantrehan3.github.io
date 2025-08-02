import { ReactElement } from "react";
import { Text, Button, Group, Stack } from "@mantine/core";
import { IconUser, IconFolder } from "@tabler/icons-react";
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
      <Text className={classes.text}>Let's explore what I can do for you.</Text>

      <Group className={classes.buttonGroup} gap="md">
        <Button
          className={classes.primaryButton}
          onClick={handleAboutClick}
          leftSection={<IconUser size={16} />}
        >
          Learn About Me
        </Button>
        <Button
          className={classes.secondaryButton}
          onClick={handleProjectsClick}
          leftSection={<IconFolder size={16} />}
          variant="outline"
        >
          View Projects
        </Button>
      </Group>
    </div>
  );
}
