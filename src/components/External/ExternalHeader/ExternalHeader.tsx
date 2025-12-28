import { FC, useCallback } from "react";
import { Button, Group, Tooltip } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { ExternalLayout } from "@/components/External/ExternalLayout";
import config from "@/utils/Config";
import helpers from "@/utils/Helpers";

import classes from "./ExternalHeader.module.css";

interface ButtonConfig {
  name: string;
  tooltip: string;
  icon: string; // Changed from keyof typeof TablerIcons to string
  onClick: {
    method: keyof typeof helpers;
    args: { url?: string };
  };
}

const ExternalHeader: FC = () => {
  const buttons: ButtonConfig[] = config.get("EXTERNAL.HEADER.BUTTONS");

  const handleButtonClick = useCallback(
    (method: keyof typeof helpers, args: { url?: string }) => {
      switch (method) {
        case "goBack":
          helpers.goBack();
          break;
        case "openUrlOnTop":
          helpers.openUrlOnTop(args);
          break;
        default:
          // eslint-disable-next-line no-console
          console.warn(`Unknown method: ${method}`);
      }
    },
    [helpers]
  );

  return (
    <ExternalLayout>
      <Group className={classes.iframe_container}>
        {buttons.map((button) => (
          <Tooltip key={button.name} label={button.tooltip} withArrow>
            <Button
              onClick={() =>
                handleButtonClick(button.onClick.method, button.onClick.args)
              }
              leftSection={<Icon name={button.icon as any} />}
              className={classes.custom_button}
            >
              {button.name}
            </Button>
          </Tooltip>
        ))}
      </Group>
    </ExternalLayout>
  );
};

export { ExternalHeader };
export default ExternalHeader;
