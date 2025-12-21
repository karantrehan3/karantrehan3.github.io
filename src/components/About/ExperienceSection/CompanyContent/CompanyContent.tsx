import { ReactElement } from "react";
import { Text } from "@mantine/core";

import { ProjectItem } from "@/components/About/ExperienceSection/ProjectItem";
import { RoleItem } from "@/components/About/ExperienceSection/RoleItem";
import type { Project, Role } from "@/components/About/ExperienceSection/types";

import classes from "./CompanyContent.module.css";

interface CompanyContentProps {
  roles: Role[];
  projects?: Project[];
}

export function CompanyContent({
  roles,
  projects,
}: CompanyContentProps): ReactElement {
  return (
    <div className={classes.companyContent}>
      {/* Roles Timeline */}
      <div className={classes.rolesTimeline}>
        {roles.map((role: Role, roleIndex: number) => (
          <RoleItem
            key={roleIndex}
            title={role.TITLE}
            period={role.PERIOD}
            description={role.DESCRIPTION}
          />
        ))}
      </div>

      {/* Projects Section (if exists) */}
      {projects && projects.length > 0 && (
        <div className={classes.projectsSection}>
          <Text fw={600} size="sm" className={classes.projectsTitle}>
            Key Projects:
          </Text>
          <div className={classes.projectsGrid}>
            {projects.map((project: Project, projectIndex: number) => (
              <ProjectItem
                key={projectIndex}
                name={project.NAME}
                currentName={project.CURRENT_NAME}
                url={project.URL}
                role={project.ROLE}
                description={project.DESCRIPTION}
                logo={project.LOGO}
                logoAlt={project.LOGO_ALT}
                currentLogo={project.CURRENT_LOGO}
                currentLogoAlt={project.CURRENT_LOGO_ALT}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
