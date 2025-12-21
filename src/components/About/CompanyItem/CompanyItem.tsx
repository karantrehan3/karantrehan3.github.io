import { ReactElement, useState } from "react";
import { Anchor, Group, Image, Text } from "@mantine/core";

import Icon from "@/components/Icons";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

import { CollapsibleSection } from "../CollapsibleSection";
import { ImagePreviewModal } from "../ImagePreviewModal";
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

interface CompanyHeaderProps {
  name: string;
  url: string;
  logo?: string;
  logoAlt?: string;
  additionalLogo?: string;
  additionalLogoAlt?: string;
  subtitle?: string;
  onImageClick?: () => void;
}

interface CompanyItemProps {
  roles: Role[];
  projects?: Project[];
}

export interface Company {
  NAME: string;
  URL: string;
  LOGO?: string;
  LOGO_ALT?: string;
  ADDITIONAL_LOGO?: string;
  ADDITIONAL_LOGO_ALT?: string;
  SUBTITLE?: string;
  ROLES: Role[];
  PROJECTS?: Project[];
}

interface CompanyCollapsibleSectionProps {
  company: Company;
  index: number;
}

export function CompanyHeader({
  name,
  url,
  logo,
  logoAlt,
  additionalLogo,
  additionalLogoAlt,
  subtitle,
  onImageClick,
}: CompanyHeaderProps): ReactElement {
  return (
    <Group gap="xs" align="center" className={classes.companyHeader}>
      <Group gap="xs" align="center" className={classes.companyInfo}>
        {logo && (
          <div
            className={classes.companyLogoContainer}
            onClick={(e) => {
              e.stopPropagation();
              onImageClick?.();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onImageClick?.();
              }
            }}
          >
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
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
              }
            }}
            role="presentation"
          >
            <Anchor href={url} target="_blank" className={classes.companyLink}>
              {name}
            </Anchor>
            <Icon name="IconExternalLink" size={16} />
          </div>
          {subtitle && (
            <div
              className={classes.companySubtitle}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                }
              }}
              role="presentation"
            >
              <MarkdownRenderer content={subtitle} />
            </div>
          )}
        </div>
      </Group>
    </Group>
  );
}

export function CompanyItem({
  roles,
  projects,
}: CompanyItemProps): ReactElement {
  return (
    <div className={classes.companyItem}>
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

export function CompanyCollapsibleSection({
  company,
  index,
}: CompanyCollapsibleSectionProps): ReactElement {
  const [previewOpened, setPreviewOpened] = useState(false);

  const handleImageClick = () => {
    setPreviewOpened(true);
  };

  const getPreviewImages = () => {
    const images = [];
    if (company.LOGO) {
      images.push({
        src: company.LOGO,
        alt: company.LOGO_ALT || `${company.NAME} logo`,
      });
    }
    if (company.ADDITIONAL_LOGO) {
      images.push({
        src: company.ADDITIONAL_LOGO,
        alt: company.ADDITIONAL_LOGO_ALT || `${company.NAME} additional logo`,
      });
    }
    return images;
  };

  return (
    <>
      <ImagePreviewModal
        opened={previewOpened}
        onClose={() => setPreviewOpened(false)}
        images={getPreviewImages()}
      />
      {/* TODO: Review defaultExpanded and enableScrollAutoExpand */}
      <CollapsibleSection
        id={`company-${index}`}
        defaultExpanded={false}
        enableScrollAutoExpand={false}
        customHeader={
          <CompanyHeader
            name={company.NAME}
            url={company.URL}
            logo={company.LOGO}
            logoAlt={company.LOGO_ALT}
            additionalLogo={company.ADDITIONAL_LOGO}
            additionalLogoAlt={company.ADDITIONAL_LOGO_ALT}
            subtitle={company.SUBTITLE}
            onImageClick={handleImageClick}
          />
        }
      >
        <CompanyItem roles={company.ROLES} projects={company.PROJECTS} />
      </CollapsibleSection>
    </>
  );
}
