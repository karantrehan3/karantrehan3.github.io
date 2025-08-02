import { ReactElement } from "react";
import { Paper, Title, Group, Badge } from "@mantine/core";
import classes from "./FocusAreas.module.css";

interface FocusAreasProps {
  areas: string[];
}

export function FocusAreas({ areas }: FocusAreasProps): ReactElement {
  return (
    <Paper className={classes.focusSection} p="xl" radius="md">
      <Title order={3} className={classes.sectionTitle}>
        Focus Areas
      </Title>
      <Group gap="sm" className={classes.focusBadges}>
        {areas.map((area: string) => (
          <Badge
            key={area}
            size="lg"
            variant="light"
            className={classes.focusBadge}
          >
            {area}
          </Badge>
        ))}
      </Group>
    </Paper>
  );
}
