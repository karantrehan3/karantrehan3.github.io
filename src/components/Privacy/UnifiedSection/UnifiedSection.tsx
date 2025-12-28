import { memo, ReactElement, useCallback, useMemo, useState } from "react";
import { Anchor, Box, Button, Text, Title } from "@mantine/core";

import { ConsentStatus, Icon, MarkdownRenderer } from "@/components";
import Constants from "@/utils/Constants";

import { PrivacySection } from "../types";
import classes from "./UnifiedSection.module.css";

interface UnifiedSectionProps {
  section: PrivacySection;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
  consentStatus?: ConsentStatus;
  buttonHandlers?: Record<string, () => void>;
}

function UnifiedSectionComponent({
  section,
  getSectionId,
  onSectionClick,
  consentStatus,
  buttonHandlers,
}: UnifiedSectionProps): ReactElement {
  const sectionId = getSectionId(section.title);
  const titleId = `${sectionId}-title`;

  const getStatusLabel = useCallback((): string => {
    if (!consentStatus) {
      return "";
    }
    const labelKey =
      Constants.CONSENT_STATUS_TO_LABEL_KEY[
        consentStatus as keyof typeof Constants.CONSENT_STATUS_TO_LABEL_KEY
      ];
    return Constants.CONSENT_STATUS_LABELS[labelKey] || "";
  }, [consentStatus]);

  // Check if content contains {CURRENT_PREFERENCE} placeholder and split content
  const currentPreferenceData = useMemo(() => {
    const hasCurrentPreference =
      section.content.includes("{CURRENT_PREFERENCE}") &&
      consentStatus !== undefined;

    if (!hasCurrentPreference) {
      return {
        hasCurrentPreference: false,
        before: section.content,
        after: "",
      };
    }

    const parts = section.content.split("{CURRENT_PREFERENCE}");
    return {
      hasCurrentPreference: true,
      before: parts[0] || "",
      after: parts[1] || "",
    };
  }, [section.content, consentStatus]);

  const hasButton =
    section.buttonIcon && section.buttonText && section.buttonMethod;

  const handleButtonClick = useCallback((): void => {
    if (!section.buttonMethod || !buttonHandlers) {
      return;
    }
    const handler = buttonHandlers[section.buttonMethod];
    if (handler) {
      handler();
    }
  }, [section.buttonMethod, buttonHandlers]);

  const [showToast, setShowToast] = useState(false);

  const copyUrlToClipboard = useCallback(
    async (sectionId: string): Promise<void> => {
      try {
        // Construct the URL with the section hash
        const currentHash = window.location.hash;
        let urlWithHash: string;

        if (currentHash.includes("#/privacy")) {
          urlWithHash = `${window.location.origin}${window.location.pathname}#/privacy#${sectionId}`;
        } else if (currentHash.startsWith("#/")) {
          urlWithHash = `${window.location.origin}${window.location.pathname}${currentHash}#${sectionId}`;
        } else {
          urlWithHash = `${window.location.origin}${window.location.pathname}#/privacy#${sectionId}`;
        }

        await navigator.clipboard.writeText(urlWithHash);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (error) {
        // Fallback for older browsers
        // eslint-disable-next-line no-console
        console.warn("Failed to copy to clipboard:", error);
        try {
          const textArea = document.createElement("textarea");
          textArea.value = `${window.location.origin}${window.location.pathname}#/privacy#${sectionId}`;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        } catch (fallbackError) {
          // eslint-disable-next-line no-console
          console.error("Fallback copy failed:", fallbackError);
        }
      }
    },
    []
  );

  const handleSectionHeaderClick = useCallback(
    (e: React.MouseEvent): void => {
      e.preventDefault();
      onSectionClick(sectionId);
      // Copy URL to clipboard after a short delay to ensure URL is updated
      setTimeout(() => {
        copyUrlToClipboard(sectionId);
      }, 100);
    },
    [sectionId, onSectionClick, copyUrlToClipboard]
  );

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
        <Box
          component="span"
          className={classes["section-title__wrapper"]}
          onClick={handleSectionHeaderClick}
          style={{ cursor: "pointer" }}
        >
          {section.title}
          <Anchor
            href={`#${sectionId}`}
            className={classes["section-title__link"]}
            aria-label={`Link to ${section.title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSectionHeaderClick(e);
            }}
          >
            🔗
          </Anchor>
        </Box>
      </Title>
      <div className={classes.section__text}>
        {currentPreferenceData.hasCurrentPreference ? (
          <Text component="div" className={classes["section__text-inline"]}>
            {currentPreferenceData.before && (
              <MarkdownRenderer
                content={currentPreferenceData.before}
                className={classes["markdown-inline"]}
              />
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
            {currentPreferenceData.after && (
              <MarkdownRenderer
                content={currentPreferenceData.after}
                className={classes["markdown-inline"]}
              />
            )}
          </Text>
        ) : (
          <MarkdownRenderer content={section.content} />
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
      {showToast && (
        <Box className={classes.toast}>
          <Text size="sm" fw={500}>
            Link copied to clipboard!
          </Text>
        </Box>
      )}
    </section>
  );
}

export const UnifiedSection = memo(UnifiedSectionComponent);
