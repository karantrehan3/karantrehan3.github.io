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
  YEARS: string;
  DESCRIPTION: string;
  COMPANIES: Company[];
}

interface ExperienceSectionProps {
  experienceSummary: ExperienceSummary;
}

export function ExperienceSection({
  experienceSummary,
}: ExperienceSectionProps): ReactElement {
  return (
    <Paper className={classes.experienceSection} p="xl" radius="md">
      <Title order={3} className={classes.sectionTitle}>
        Experience
      </Title>
      <Text className={classes.experienceText}>
        <strong>{experienceSummary.YEARS}</strong>{" "}
        {experienceSummary.DESCRIPTION}
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
