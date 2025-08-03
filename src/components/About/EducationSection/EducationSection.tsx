import { ReactElement } from "react";
import { Badge, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";

import classes from "./EducationSection.module.css";

interface EducationSectionProps {
  degree: string;
  university: string;
  graduationDate: string;
  marks: string;
  logo?: string;
  achievements?: string[];
}

export function EducationSection({
  degree,
  university,
  graduationDate,
  marks,
  logo,
  achievements,
}: EducationSectionProps): ReactElement {
  return (
    <Paper className={classes.educationSection} p="xl" radius="md">
      <Title order={3} className={classes.sectionTitle}>
        Education
      </Title>
      <div className={classes.educationContent}>
        <Group gap="xs" align="center" className={classes.universityHeader}>
          {logo && (
            <Image
              src={logo}
              alt={`${university} logo`}
              className={classes.universityLogo}
              width={40}
              height={40}
              fit="contain"
            />
          )}
          <Text fw={600} size="lg" className={classes.degreeTitle}>
            {degree}
          </Text>
        </Group>
        <Group
          gap="xs"
          align="center"
          justify="space-between"
          className={classes.educationDetails}
        >
          <Text size="md" className={classes.universityInfo}>
            {university}
          </Text>
          <Stack gap="xs" align="flex-end">
            <Badge
              size="sm"
              variant="light"
              className={classes.graduationBadge}
            >
              {graduationDate}
            </Badge>
            <Text size="md" fw={600} className={classes.marksInfo}>
              Marks {marks}
            </Text>
          </Stack>
        </Group>
        {achievements && achievements.length > 0 && (
          <Group gap="xs" className={classes.achievementsList}>
            {achievements.map((achievement: string, index: number) => (
              <Badge
                key={index}
                size="md"
                variant="filled"
                color="yellow"
                className={classes.achievementBadge}
              >
                {achievement}
              </Badge>
            ))}
          </Group>
        )}
      </div>
    </Paper>
  );
}
