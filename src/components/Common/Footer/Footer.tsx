import { ReactElement, useState } from "react";
import { ActionIcon, Anchor, Group, Text, Tooltip } from "@mantine/core";

import { Icon, ShareDialog } from "@/components";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./Footer.module.css";

export function Footer(): ReactElement {
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleShareClick = (): void => {
    setDialogOpened(true);
  };

  const handleSocialClick = (platform: string, url: string): void => {
    analytics.trackSocialClick(platform, url);
    if (platform === "email") {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <footer className={classes.footer}>
        <Group gap="md" justify="center" className={classes.socialIcons}>
          <Tooltip label="GitHub" withArrow>
            <ActionIcon
              variant="subtle"
              size="lg"
              className={classes.socialIcon}
              aria-label="GitHub"
              onClick={() =>
                handleSocialClick("github", config.get("SOCIALS.GITHUB"))
              }
            >
              <Icon name="IconBrandGithub" size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="LinkedIn" withArrow>
            <ActionIcon
              variant="subtle"
              size="lg"
              className={classes.socialIcon}
              aria-label="LinkedIn"
              onClick={() =>
                handleSocialClick("linkedin", config.get("SOCIALS.LINKEDIN"))
              }
            >
              <Icon name="IconBrandLinkedin" size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Email" withArrow>
            <ActionIcon
              variant="subtle"
              size="lg"
              className={classes.socialIcon}
              aria-label="Email"
              onClick={() =>
                handleSocialClick(
                  "email",
                  `mailto:${config.get("SOCIALS.EMAIL.ID")}?subject=${config.get("SOCIALS.EMAIL.SUBJECT")}`
                )
              }
            >
              <Icon name="IconMail" size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Group gap="xs" justify="center" wrap="wrap">
          <Text className={classes.footer__copyright}>
            &copy; {config.get("HOME.TITLE.NAME")}, {new Date().getFullYear()}
          </Text>
          <Text className={classes.footer__separator}>•</Text>
          <Anchor
            href="#"
            className={classes.footer__link}
            onClick={(e) => {
              e.preventDefault();
              handleShareClick();
            }}
          >
            <Icon name="IconShare" size={16} />
            {config.get("CTAS.SHARE.BUTTON_TEXT")}
          </Anchor>
          <Text className={classes.footer__separator}>•</Text>
          <Anchor href="#/privacy" className={classes.footer__link}>
            <Icon name="IconShieldCheck" size={16} />
            Privacy Policy
          </Anchor>
        </Group>
      </footer>

      <ShareDialog
        opened={dialogOpened}
        onClose={() => setDialogOpened(false)}
      />
    </>
  );
}
