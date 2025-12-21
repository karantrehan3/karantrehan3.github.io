import { ReactElement } from "react";
import { Paper, Stack, Text } from "@mantine/core";

import { Company, CompanyCollapsibleSection } from "../CompanyItem";
import classes from "./ExperienceSection.module.css";

interface ExperienceSummary {
  START_DATE: string;
  DESCRIPTION: string;
  COMPANIES: Company[];
}

interface ExperienceSectionProps {
  experienceSummary: ExperienceSummary;
}

function calculateExperience(startDate: string): string {
  const [day, month, year] = startDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const current = new Date();

  const totalMonths =
    (current.getFullYear() - start.getFullYear()) * 12 +
    current.getMonth() -
    start.getMonth() -
    (current.getDate() < start.getDate() ? 1 : 0);

  const roundedYears = Math.round((totalMonths / 12) * 10) / 10;

  return `${roundedYears}+ ${roundedYears === 1 ? "year" : "years"}`;
}

export function ExperienceSection({
  experienceSummary,
}: ExperienceSectionProps): ReactElement {
  const experienceText = calculateExperience(experienceSummary.START_DATE);

  return (
    <Paper className={classes.experienceSection} p="xl" radius="md">
      <Text className={classes.experienceText}>
        <strong>{experienceText}</strong> {experienceSummary.DESCRIPTION}
      </Text>

      <Stack gap="xl" className={classes.companiesList}>
        {experienceSummary.COMPANIES.map((company: Company, index: number) => (
          <CompanyCollapsibleSection
            key={index}
            company={company}
            index={index}
          />
        ))}
      </Stack>
    </Paper>
  );
}
