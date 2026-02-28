import { ReactElement } from "react";
import { Button, Text, Title } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import analytics from "@/utils/Analytics";
import config from "@/utils/Config";

import classes from "./Calendar.module.css";

export function Calendar(): ReactElement {
  const calendarLink = config.get("CONTACT.CALENDAR.LINK");
  const calendarTitle = config.get("CONTACT.CALENDAR.TITLE");

  const handleOpenCalendar = (): void => {
    analytics.trackCTAClick("Calendar", calendarLink);
    window.open(calendarLink, "_blank");
  };

  return (
    <div className={classes.calendarCard}>
      <div className={classes.iconWrapper}>
        <Icon name="IconCalendarEvent" size={48} />
      </div>
      <Title order={3} className={classes.title}>
        {calendarTitle}
      </Title>
      <Text className={classes.description}>
        Pick a time that works for you and let&apos;s connect.
      </Text>
      <Button
        className={classes.calendarButton}
        onClick={handleOpenCalendar}
        leftSection={<Icon name="IconCalendarEvent" size={18} />}
        size="md"
      >
        Schedule a Meeting
      </Button>
    </div>
  );
}
