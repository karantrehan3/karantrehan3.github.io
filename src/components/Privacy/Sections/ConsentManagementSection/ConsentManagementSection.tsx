import { memo, ReactElement, useCallback } from "react";
import { Button, Text } from "@mantine/core";

import {
  ConsentStatus,
  getConsentStatus,
} from "@/components/Common/CookieConsent";
import Icon from "@/components/Common/Icons";
import Constants from "@/utils/Constants";

import { SectionConfig } from "../../types";
import sectionClasses from "../Section.module.css";
import { SectionTitle } from "../SectionTitle";
import classes from "./ConsentManagementSection.module.css";

interface ConsentStatusLabels {
  GRANTED: string;
  DENIED: string;
  PENDING: string;
}

interface ConsentManagementSectionProps {
  section: SectionConfig;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
  consentStatus: ConsentStatus;
  consentStatusLabels: ConsentStatusLabels;
  onResetConsent: () => void;
}

function ConsentManagementSectionComponent({
  section,
  getSectionId,
  onSectionClick,
  consentStatus,
  consentStatusLabels,
  onResetConsent,
}: ConsentManagementSectionProps): ReactElement {
  const sectionId = getSectionId(section.TITLE);
  const titleId = `${sectionId}-title`;

  const getStatusLabel = useCallback((): string => {
    if (consentStatus === Constants.CONSENT_STATUS_GRANTED) {
      return consentStatusLabels.GRANTED;
    }
    if (consentStatus === Constants.CONSENT_STATUS_DENIED) {
      return consentStatusLabels.DENIED;
    }
    return consentStatusLabels.PENDING;
  }, [consentStatus, consentStatusLabels]);

  return (
    <section
      id={sectionId}
      className={sectionClasses.section}
      aria-labelledby={titleId}
    >
      <SectionTitle
        title={section.TITLE}
        sectionId={sectionId}
        titleId={titleId}
        onSectionClick={onSectionClick}
      />
      <Text mb="md" className={sectionClasses.section__text}>
        {section.INTRO} Your current preference is:{" "}
        <Text
          component="span"
          fw={600}
          className={`${classes["consent-status"]} ${
            classes[`consent-status--${consentStatus}`]
          }`}
        >
          {getStatusLabel()}
        </Text>
      </Text>
      <Button
        variant="outline"
        color="orange"
        onClick={onResetConsent}
        leftSection={<Icon name="IconCookie" size={16} />}
        aria-label="Reset cookie consent preferences"
      >
        {section.BUTTON_TEXT}
      </Button>
      <Text
        size="sm"
        c="dimmed"
        mt="sm"
        className={sectionClasses.section__text}
      >
        {section.BUTTON_DESCRIPTION}
      </Text>
    </section>
  );
}

export const ConsentManagementSection = memo(ConsentManagementSectionComponent);

// Re-export getConsentStatus for convenience
export { getConsentStatus };
