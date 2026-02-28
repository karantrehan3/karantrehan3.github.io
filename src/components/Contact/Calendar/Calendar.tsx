import { ReactElement } from "react";
import { Button, Text, Title } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./Calendar.module.css";

export function Calendar(): ReactElement {
  const calendarLink = config.get("CONTACT.CALENDAR.LINK");
  const calendarTitle = config.get("CONTACT.CALENDAR.TITLE");

  const handleScheduleClick = (): void => {
    analytics.trackCTAClick("Schedule Meeting", calendarLink);
    window.open(calendarLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={classes.card}>
      <div className={classes.iconWrapper}>
        <Icon name="IconCalendarEvent" size={48} />
      </div>
      <Title order={3} className={classes.title}>
        {calendarTitle}
      </Title>
      <Text className={classes.description}>
        Pick a time that works for you. I&apos;ll send you a calendar invite
        with all the details to connect.
      </Text>
      <Button
        size="lg"
        className={classes.ctaButton}
        onClick={handleScheduleClick}
        leftSection={<Icon name="IconExternalLink" size={18} />}
      >
        Open Calendar
      </Button>
    </div>
  );
}
