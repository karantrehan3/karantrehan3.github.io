import { ReactElement } from "react";
import { Button, Stack } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./Socials.module.css";

export function Socials(): ReactElement {
  const handleEmailClick = (): void => {
    const emailId = config.get("SOCIALS.EMAIL.ID");
    analytics.trackSocialClick("email", "mailto");
    window.location.href = `mailto:${emailId}?subject=${config.get("SOCIALS.EMAIL.SUBJECT")}`;
  };

  const handleLinkedInClick = (): void => {
    const linkedInUrl = config.get("SOCIALS.LINKEDIN");
    analytics.trackSocialClick("linkedin", linkedInUrl);
    window.open(linkedInUrl, "_blank");
  };

  const handleGithubClick = (): void => {
    const githubUrl = config.get("SOCIALS.GITHUB");
    analytics.trackSocialClick("github", githubUrl);
    window.open(githubUrl, "_blank");
  };

  return (
    <div>
      <Stack gap="xl">
        <Button
          variant="default"
          size="md"
          leftSection={
            <Icon
              name="IconBrandGmail"
              size={25}
              className={classes.email_icon}
            />
          }
          className={classes.email_button}
          onClick={handleEmailClick}
        >
          {config.get("SOCIALS.EMAIL.LABEL")}
        </Button>
        <Button
          variant="default"
          size="md"
          leftSection={
            <Icon
              name="IconBrandLinkedin"
              size={25}
              className={classes.linkedin_icon}
            />
          }
          className={classes.linkedin_button}
          onClick={handleLinkedInClick}
        >
          {config.get("SOCIALS.LINKEDIN_LABEL")}
        </Button>
        <Button
          variant="default"
          size="md"
          leftSection={
            <Icon
              name="IconBrandGithub"
              size={25}
              className={classes.github_icon}
            />
          }
          className={classes.github_button}
          onClick={handleGithubClick}
        >
          {config.get("SOCIALS.GITHUB_LABEL")}
        </Button>
      </Stack>
    </div>
  );
}
