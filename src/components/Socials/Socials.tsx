import { ReactElement } from "react";
import { Button, Stack } from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandGmail,
} from "@tabler/icons-react";
import config from "@/utils/Config";
import classes from "./Socials.module.css";

export function Socials(): ReactElement {
  const handleEmailClick = (): void => {
    window.location.href = `mailto:${config.get("SOCIALS.EMAIL.ID")}?subject=${config.get("SOCIALS.EMAIL.SUBJECT")}`;
  };

  const handleLinkedInClick = (): void => {
    window.open(config.get("SOCIALS.LINKEDIN"), "_blank");
  };

  const handleGithubClick = (): void => {
    window.open(config.get("SOCIALS.GITHUB"), "_blank");
  };

  return (
    <div>
      <Stack gap="xl">
        <Button
          variant="default"
          size="md"
          leftSection={
            <IconBrandGmail size={25} className={classes.email_icon} />
          }
          className={classes.email_button}
          onClick={handleEmailClick}
        >
          Email
        </Button>
        <Button
          variant="default"
          size="md"
          leftSection={
            <IconBrandLinkedin size={25} className={classes.linkedin_icon} />
          }
          className={classes.linkedin_button}
          onClick={handleLinkedInClick}
        >
          LinkedIn
        </Button>
        <Button
          variant="default"
          size="md"
          leftSection={
            <IconBrandGithub size={25} className={classes.github_icon} />
          }
          className={classes.github_button}
          onClick={handleGithubClick}
        >
          GitHub
        </Button>
      </Stack>
    </div>
  );
}
