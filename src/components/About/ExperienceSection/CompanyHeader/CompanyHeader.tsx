import { ReactElement } from "react";
import { Anchor, Group, Image } from "@mantine/core";

import Icon from "@/components/Common/Icons";
import { MarkdownRenderer } from "@/components/Common/MarkdownRenderer";
import {
  createKeyboardActionHandler,
  createStopPropagationHandler,
} from "@/utils/EventHandlers";

import classes from "./CompanyHeader.module.css";

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
            onKeyDown={
              onImageClick
                ? createKeyboardActionHandler(() => {
                    onImageClick();
                  })
                : undefined
            }
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
          <div className={classes.companyLinkWrapper}>
            <Anchor
              href={url}
              target="_blank"
              className={classes.companyLink}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={createStopPropagationHandler()}
            >
              {name}
            </Anchor>
            <Icon name="IconExternalLink" size={16} />
          </div>
          {subtitle && (
            <div
              className={classes.companySubtitle}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={createStopPropagationHandler()}
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
