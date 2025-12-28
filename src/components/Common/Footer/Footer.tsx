import { ReactElement, useState } from "react";
import { Anchor, Group, Text } from "@mantine/core";

import { ShareDialog } from "@/components";
import config from "@/utils/Config";

import classes from "./Footer.module.css";

export function Footer(): ReactElement {
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleShareClick = (): void => {
    setDialogOpened(true);
  };

  return (
    <>
      <footer className={classes.footer}>
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
            {config.get("CTAS.SHARE.BUTTON_TEXT")}
          </Anchor>
          <Text className={classes.footer__separator}>•</Text>
          <Anchor href="#/privacy" className={classes.footer__link}>
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
