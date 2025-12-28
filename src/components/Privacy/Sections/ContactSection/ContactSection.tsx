import { memo, ReactElement, useMemo } from "react";
import { Anchor, Text } from "@mantine/core";

import { SectionConfig } from "../../types";
import classes from "../Section.module.css";
import { SectionTitle } from "../SectionTitle";

interface ContactSectionProps {
  section: SectionConfig;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
  ownerEmail: string;
  replacePlaceholders: (text: string) => string;
}

function ContactSectionComponent({
  section,
  getSectionId,
  onSectionClick,
  ownerEmail,
  replacePlaceholders,
}: ContactSectionProps): ReactElement {
  const sectionId = getSectionId(section.TITLE);
  const titleId = `${sectionId}-title`;

  const { beforeEmail, afterEmail } = useMemo(() => {
    const content = replacePlaceholders(section.CONTENT || "");
    const parts = content.split(ownerEmail);
    return {
      beforeEmail: parts[0] || "",
      afterEmail: parts[1] || "",
    };
  }, [section.CONTENT, ownerEmail, replacePlaceholders]);

  return (
    <section
      id={sectionId}
      className={classes.section}
      aria-labelledby={titleId}
    >
      <SectionTitle
        title={section.TITLE}
        sectionId={sectionId}
        titleId={titleId}
        onSectionClick={onSectionClick}
      />
      <Text className={classes.section__text}>
        {beforeEmail}
        <Anchor
          href={`mailto:${ownerEmail}`}
          aria-label={`Send email to ${ownerEmail}`}
        >
          {ownerEmail}
        </Anchor>
        {afterEmail}
      </Text>
    </section>
  );
}

export const ContactSection = memo(ContactSectionComponent);
