import { memo, ReactElement } from "react";
import { Stack, Text, Title } from "@mantine/core";

import classes from "./ContentHeader.module.css";

interface ContentHeaderProps {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
}

function ContentHeaderComponent({
  title,
  effectiveDate,
  lastUpdated,
}: ContentHeaderProps): ReactElement {
  const showLastUpdated =
    lastUpdated && (!effectiveDate || effectiveDate !== lastUpdated);

  return (
    <header className={classes["content-header"]}>
      <Title order={1} className={classes["content-header__title"]}>
        {title}
      </Title>
      <Stack gap="xs" className={classes["content-header__dates"]}>
        {effectiveDate && (
          <Text size="sm" aria-label="Effective date">
            Effective: {effectiveDate}
          </Text>
        )}
        {showLastUpdated && (
          <Text size="sm" aria-label="Last updated date">
            Last updated: {lastUpdated}
          </Text>
        )}
        {lastUpdated && !effectiveDate && (
          <Text size="sm" aria-label="Last updated date">
            Last updated: {lastUpdated}
          </Text>
        )}
      </Stack>
    </header>
  );
}

export const ContentHeader = memo(ContentHeaderComponent);
