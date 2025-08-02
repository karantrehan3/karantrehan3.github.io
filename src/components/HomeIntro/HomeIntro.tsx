import { ReactElement } from "react";
import { Text, Button, Stack, Badge, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import config from "@/utils/Config";
import classes from "./HomeIntro.module.css";

export function HomeIntro(): ReactElement {
  const homeData = config.get("HOME");

  const handleButtonClick = (): void => {
    const section = document.querySelector("#projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={classes.container}>
      <Text size="lg" className={classes.introduction}>
        {homeData.INTRODUCTION}
      </Text>

      <Stack gap="sm" className={classes.highlights}>
        {homeData.HIGHLIGHTS.map((highlight: string, index: number) => (
          <Badge
            key={index}
            size="md"
            variant="light"
            className={classes.highlight}
          >
            {highlight}
          </Badge>
        ))}
      </Stack>

      <Button
        className={classes.button}
        onClick={handleButtonClick}
        rightSection={<IconArrowRight size={16} />}
        size="lg"
      >
        {homeData.CALL_TO_ACTION}
      </Button>
    </div>
  );
}
