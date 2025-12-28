import { memo, ReactElement, useCallback, useMemo } from "react";
import { Anchor, Box, Button, Text, Title } from "@mantine/core";

import { ConsentStatus } from "@/components/Common/CookieConsent";
import Icon from "@/components/Common/Icons";
import { MarkdownRenderer } from "@/components/Common/MarkdownRenderer";
import Constants from "@/utils/Constants";

import { PrivacySection } from "../types";
import classes from "./UnifiedSection.module.css";

interface ConsentStatusLabels {
  GRANTED: string;
  DENIED: string;
  PENDING: string;
}

interface UnifiedSectionProps {
  section: PrivacySection;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
  replacePlaceholders?: (text: string) => string;
  consentStatus?: ConsentStatus;
  consentStatusLabels?: ConsentStatusLabels;
  buttonHandlers?: Record<string, () => void>;
  ownerEmail?: string;
}

function UnifiedSectionComponent({
  section,
  getSectionId,
  onSectionClick,
  replacePlaceholders,
  consentStatus,
  consentStatusLabels,
  buttonHandlers,
  ownerEmail,
}: UnifiedSectionProps): ReactElement {
  const sectionId = getSectionId(section.title);
  const titleId = `${sectionId}-title`;

  const getStatusLabel = useCallback((): string => {
    if (!consentStatus || !consentStatusLabels) {
      return "";
    }
    if (consentStatus === Constants.CONSENT_STATUS_GRANTED) {
      return consentStatusLabels.GRANTED;
    }
    if (consentStatus === Constants.CONSENT_STATUS_DENIED) {
      return consentStatusLabels.DENIED;
    }
    return consentStatusLabels.PENDING;
  }, [consentStatus, consentStatusLabels]);

  // Process content: replace placeholders and handle email links
  const processedContent = useMemo(() => {
    let content = section.content;

    // Replace standard placeholders
    if (replacePlaceholders) {
      content = replacePlaceholders(content);
    }

    // Handle email link detection for Contact section
    if (ownerEmail && content.includes(ownerEmail)) {
      // Replace email with markdown link format
      const emailRegex = new RegExp(
        ownerEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      content = content.replace(
        emailRegex,
        `[${ownerEmail}](mailto:${ownerEmail})`
      );
    }

    return content;
  }, [section.content, replacePlaceholders, ownerEmail]);

  // Check if content contains {CURRENT_PREFERENCE} placeholder
  const hasCurrentPreference = useMemo(
    () =>
      processedContent.includes("{CURRENT_PREFERENCE}") &&
      consentStatus !== undefined &&
      consentStatusLabels !== undefined,
    [processedContent, consentStatus, consentStatusLabels]
  );

  // Split content for {CURRENT_PREFERENCE} handling
  const contentParts = useMemo(() => {
    if (!hasCurrentPreference) {
      return { before: processedContent, after: "" };
    }
    const parts = processedContent.split("{CURRENT_PREFERENCE}");
    return {
      before: parts[0] || "",
      after: parts[1] || "",
    };
  }, [processedContent, hasCurrentPreference]);

  const hasButton =
    section.buttonIcon && section.buttonText && section.buttonMethod;

  const handleButtonClick = useCallback((): void => {
    if (!section.buttonMethod || !buttonHandlers) {
      return;
    }
    const handler = buttonHandlers[section.buttonMethod];
    if (handler) {
      handler();
    } else {
      console.warn(
        `Button handler not found for method: ${section.buttonMethod}`
      );
    }
  }, [section.buttonMethod, buttonHandlers]);

  return (
    <section
      id={sectionId}
      className={classes.section}
      aria-labelledby={titleId}
    >
      <Title
        order={2}
        size="h3"
        id={titleId}
        className={classes["section-title"]}
      >
        <Box component="span" className={classes["section-title__wrapper"]}>
          {section.title}
          <Anchor
            href={`#${sectionId}`}
            className={classes["section-title__link"]}
            aria-label={`Link to ${section.title}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionClick(sectionId);
            }}
          >
            🔗
          </Anchor>
        </Box>
      </Title>
      <div className={classes.section__text}>
        {hasCurrentPreference ? (
          <div>
            {contentParts.before && (
              <MarkdownRenderer content={contentParts.before} />
            )}
            <Text
              component="span"
              fw={600}
              className={`${classes["consent-status"]} ${
                classes[`consent-status--${consentStatus}`]
              }`}
            >
              {getStatusLabel()}
            </Text>
            {contentParts.after && (
              <MarkdownRenderer content={contentParts.after} />
            )}
          </div>
        ) : (
          <MarkdownRenderer content={processedContent} />
        )}
      </div>
      {hasButton && (
        <>
          <Button
            variant="outline"
            color="orange"
            onClick={handleButtonClick}
            leftSection={<Icon name={section.buttonIcon as any} size={16} />}
            aria-label={section.buttonText}
            mt="md"
          >
            {section.buttonText}
          </Button>
          {section.subtitle && (
            <Text
              size="sm"
              c="dimmed"
              mt="sm"
              className={classes.section__text}
            >
              {section.subtitle}
            </Text>
          )}
        </>
      )}
    </section>
  );
}

export const UnifiedSection = memo(UnifiedSectionComponent);
