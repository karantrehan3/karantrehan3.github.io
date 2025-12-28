import { ReactElement } from "react";
import { Anchor, Group, Text } from "@mantine/core";

import config from "@/utils/Config";

import classes from "./Footer.module.css";

export function Footer(): ReactElement {
  return (
    <footer className={classes.footer}>
      <Group gap="xs" justify="center" wrap="wrap">
        <Text className={classes.footer__copyright}>
          &copy; {config.get("HOME.TITLE.NAME")}, {new Date().getFullYear()}
        </Text>
        <Text className={classes.footer__separator}>•</Text>
        <Anchor href="#/privacy" className={classes.footer__link}>
          Privacy Policy
        </Anchor>
      </Group>
    </footer>
  );
}
