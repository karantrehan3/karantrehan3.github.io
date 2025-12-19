import { ReactElement, useState } from "react";
import { Anchor, Group, Image, Text } from "@mantine/core";

import Icon from "@/components/Icons";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

import { ImagePreviewModal } from "../ImagePreviewModal";
import classes from "./ProjectItem.module.css";

interface ProjectItemProps {
  name: string;
  currentName?: string;
  url: string;
  role: string;
  description: string;
  logo?: string;
  logoAlt?: string;
  currentLogo?: string;
  currentLogoAlt?: string;
}

export function ProjectItem({
  name,
  currentName,
  url,
  role,
  description,
  logo,
  logoAlt,
  currentLogo,
  currentLogoAlt,
}: ProjectItemProps): ReactElement {
  const [previewOpened, setPreviewOpened] = useState(false);

  const handleImageClick = () => {
    setPreviewOpened(true);
  };

  const getPreviewImages = () => {
    const images = [];
    if (logo) {
      images.push({
        src: logo,
        alt: logoAlt || `${name} logo`,
      });
    }
    if (currentLogo) {
      images.push({
        src: currentLogo,
        alt: currentLogoAlt || `${currentName || name} current logo`,
      });
    }
    return images;
  };

  const hasImages = logo || currentLogo;

  return (
    <div className={classes.projectItem}>
      <ImagePreviewModal
        opened={previewOpened}
        onClose={() => setPreviewOpened(false)}
        images={getPreviewImages()}
      />
      <Group gap="xs" align="center">
        {/* Project Logo */}
        {hasImages && (
          <div
            className={classes.projectLogoContainer}
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick();
              }
            }}
          >
            {currentLogo && logo ? (
              // Special overlapping design for logo/currentLogo
              <div className={classes.logoOverlap}>
                <Image
                  src={logo}
                  alt={logoAlt || `${name} original logo`}
                  className={classes.logo}
                  width={40}
                  height={40}
                  fit="contain"
                />
                <Image
                  src={currentLogo}
                  alt={currentLogoAlt || `${currentName || name} current logo`}
                  className={classes.currentLogo}
                  width={40}
                  height={40}
                  fit="contain"
                />
              </div>
            ) : logo ? (
              <Image
                src={logo}
                alt={logoAlt || `${name} logo`}
                className={classes.projectLogo}
                width={40}
                height={40}
                fit="contain"
              />
            ) : currentLogo ? (
              <Image
                src={currentLogo}
                alt={currentLogoAlt || `${currentName || name} current logo`}
                className={classes.projectLogo}
                width={40}
                height={40}
                fit="contain"
              />
            ) : null}
          </div>
        )}

        <Anchor href={url} target="_blank" className={classes.projectLink}>
          {currentName ? `${name} (now ${currentName})` : name}
        </Anchor>
        <Icon name="IconExternalLink" size={14} />
      </Group>
      <Text size="xs" className={classes.projectRole}>
        {role}
      </Text>
      <Text size="sm" className={classes.projectDescription}>
        <MarkdownRenderer content={description} />
      </Text>
    </div>
  );
}
