import { ReactElement } from "react";
import { Anchor, Group, Image, Text } from "@mantine/core";

import Icon from "@/components/Icons";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

import { ProjectItem } from "../ProjectItem";
import { RoleItem } from "../RoleItem";
import classes from "./CompanyItem.module.css";

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

interface CompanyItemProps {
  name: string;
  url: string;
  logo?: string;
  logoAlt?: string;
  additionalLogo?: string;
  additionalLogoAlt?: string;
  subtitle?: string;
  roles: Role[];
  projects?: Project[];
}

export function CompanyItem({
  name,
  url,
  logo,
  logoAlt,
  additionalLogo,
  additionalLogoAlt,
  subtitle,
  roles,
  projects,
}: CompanyItemProps): ReactElement {
  return (
    <div className={classes.companyItem}>
      <Group gap="xs" align="center" className={classes.companyHeader}>
        <Group gap="xs" align="center" className={classes.companyInfo}>
          {logo && (
            <div className={classes.companyLogoContainer}>
              {additionalLogo ? (
                // Special overlapping design for logo/additionalLogo
                <div className={classes.logoOverlap}>
                  <Image
                    src={logo}
                    alt={logoAlt || `${name} original logo`}
                    className={classes.logo}
                    width={60}
                    height={60}
                    fit="contain"
                  />
                  <Image
                    src={additionalLogo}
                    alt={additionalLogoAlt || `${name} additional logo`}
                    className={classes.additionalLogo}
                    width={60}
                    height={60}
                    fit="contain"
                  />
                </div>
              ) : (
                <Image
                  src={logo}
                  alt={logoAlt || `${name} logo`}
                  className={classes.companyLogo}
                  width={60}
                  height={60}
                  fit="contain"
                />
              )}
            </div>
          )}
          <div className={classes.companyLinkContainer}>
            <div>
              <Anchor
                href={url}
                target="_blank"
                className={classes.companyLink}
              >
                {name}
              </Anchor>
              <Icon name="IconExternalLink" size={16} />
            </div>
            {subtitle && (
              <div className={classes.companySubtitle}>
                <MarkdownRenderer content={subtitle} />
              </div>
            )}
          </div>
        </Group>
      </Group>

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
