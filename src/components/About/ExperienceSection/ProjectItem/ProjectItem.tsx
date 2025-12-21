import { ReactElement, useMemo } from "react";
import { Anchor, Group, Image, Text } from "@mantine/core";

import { ImagePreviewModal } from "@/components/About/ImagePreviewModal";
import Icon from "@/components/Icons";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useImagePreview } from "@/hooks/useImagePreview";
import { createKeyboardActionHandler } from "@/utils/eventHandlers";

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
  const hasImages = logo || currentLogo;

  const previewImages = useMemo(() => {
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
  }, [logo, logoAlt, currentLogo, currentLogoAlt, currentName, name]);

  const {
    previewOpened,
    openPreview,
    closePreview,
    previewImages: images,
  } = useImagePreview({ images: previewImages });

  return (
    <div className={classes.projectItem}>
      <ImagePreviewModal
        opened={previewOpened}
        onClose={closePreview}
        images={images}
      />
      <Group gap="xs" align="center">
        {/* Project Logo */}
        {hasImages && (
          <div
            className={classes.projectLogoContainer}
            onClick={openPreview}
            role="button"
            tabIndex={0}
            onKeyDown={createKeyboardActionHandler(openPreview)}
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
