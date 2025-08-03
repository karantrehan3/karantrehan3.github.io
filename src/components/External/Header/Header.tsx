import { FC } from "react";
import { Button, Group, Tooltip } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";

import Layout from "@/components/External/Layout/Layout";
import Icon from "@/components/Icons";
import config from "@/utils/Config";
import helpers from "@/utils/Helpers";

import classes from "./Header.module.css";

interface ButtonConfig {
  name: string;
  tooltip: string;
  icon: keyof typeof TablerIcons;
  onClick: {
    method: keyof typeof helpers;
    args: { url?: string };
  };
}

const Header: FC = () => {
  const buttons: ButtonConfig[] = config.get("EXTERNAL.HEADER.BUTTONS");

  return (
    <Layout>
      <Group className={classes.iframe_container}>
        {buttons.map((button) => (
          <Tooltip key={button.name} label={button.tooltip} withArrow>
            <Button
              onClick={() =>
                helpers[button.onClick.method](button.onClick.args)
              }
              leftSection={<Icon name={button.icon} />}
              className={classes.custom_button}
            >
              {button.name}
            </Button>
          </Tooltip>
        ))}
      </Group>
    </Layout>
  );
};

export default Header;
