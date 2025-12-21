import { ReactElement } from "react";
import { Paper, Stack, Text } from "@mantine/core";

import { Company } from "@/components/About/ExperienceSection/Company";
import type { Company as CompanyType } from "@/components/About/ExperienceSection/types";

import classes from "./ExperienceSection.module.css";

interface ExperienceSummary {
  START_DATE: string;
  DESCRIPTION: string;
  COMPANIES: CompanyType[];
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
        {experienceSummary.COMPANIES.map(
          (company: CompanyType, index: number) => (
            <Company key={index} company={company} index={index} />
          )
        )}
      </Stack>
    </Paper>
  );
}
