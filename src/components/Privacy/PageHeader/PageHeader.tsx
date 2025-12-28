import { memo, ReactElement } from "react";
import { Stack, Text, Title } from "@mantine/core";

import classes from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
}

function PageHeaderComponent({
  title,
  effectiveDate,
  lastUpdated,
}: PageHeaderProps): ReactElement {
  const showLastUpdated =
    lastUpdated && (!effectiveDate || effectiveDate !== lastUpdated);

  return (
    <header className={classes["page-header"]}>
      <Title order={1} className={classes["page-header__title"]}>
        {title}
      </Title>
      <Stack gap="xs" className={classes["page-header__dates"]}>
        {effectiveDate && (
          <Text size="sm" c="dimmed" aria-label="Effective date">
            Effective: {effectiveDate}
          </Text>
        )}
        {showLastUpdated && (
          <Text size="sm" c="dimmed" aria-label="Last updated date">
            Last updated: {lastUpdated}
          </Text>
        )}
        {lastUpdated && !effectiveDate && (
          <Text size="sm" c="dimmed" aria-label="Last updated date">
            Last updated: {lastUpdated}
          </Text>
        )}
      </Stack>
    </header>
  );
}

export const PageHeader = memo(PageHeaderComponent);
