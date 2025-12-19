import { ReactElement } from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { CompanyItem } from "../CompanyItem";
import classes from "./ExperienceSection.module.css";

interface Role {
  TITLE: string;
  PERIOD: string;
  DESCRIPTION: string;
}

interface Project {
  NAME: string;
  CURRENT_NAME?: string;
  URL: string;
  ROLE: string;
  LOGO?: string;
  LOGO_ALT?: string;
  CURRENT_LOGO?: string;
  CURRENT_LOGO_ALT?: string;
  DESCRIPTION: string;
}

interface Company {
  NAME: string;
  URL: string;
  LOGO?: string;
  LOGO_ALT?: string;
  ROLES: Role[];
  PROJECTS?: Project[];
}

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
      <Title order={3} className={classes.sectionTitle}>
        Experience
      </Title>
      <Text className={classes.experienceText}>
        <strong>{experienceText}</strong> {experienceSummary.DESCRIPTION}
      </Text>

      <Stack gap="xl" className={classes.companiesList}>
        {experienceSummary.COMPANIES.map((company: Company, index: number) => (
          <CompanyItem
            key={index}
            name={company.NAME}
            url={company.URL}
            logo={company.LOGO}
            logoAlt={company.LOGO_ALT}
            roles={company.ROLES}
            projects={company.PROJECTS}
          />
        ))}
      </Stack>
    </Paper>
  );
}
