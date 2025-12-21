import { ReactElement } from "react";
import { Paper, Stack, Text } from "@mantine/core";

import { Company } from "@/components/About/ExperienceSection/Company";
import type { Company as CompanyType } from "@/components/About/ExperienceSection/types";
import helpers from "@/utils/Helpers";

import classes from "./ExperienceSection.module.css";

interface ExperienceSummary {
  START_DATE: string;
  DESCRIPTION: string;
  COMPANIES: CompanyType[];
}

interface ExperienceSectionProps {
  experienceSummary: ExperienceSummary;
}

export function ExperienceSection({
  experienceSummary,
}: ExperienceSectionProps): ReactElement {
  const experienceText = helpers.calculateYearsOfExperience(
    experienceSummary.START_DATE,
    true
  ) as string;

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
