import { ReactElement } from "react";
import { Text } from "@mantine/core";

import config from "@/utils/Config";

import classes from "./Footer.module.css";

export function Footer(): ReactElement {
  return (
    <footer className={classes.footer}>
      <Text className={classes.copyright}>
        &copy; {config.get("HOME.TITLE.NAME")}, {new Date().getFullYear()}
      </Text>
    </footer>
  );
}
