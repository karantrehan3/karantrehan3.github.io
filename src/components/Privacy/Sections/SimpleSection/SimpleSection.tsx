import { memo, ReactElement, useCallback } from "react";
import { Text } from "@mantine/core";

import { SectionConfig } from "../../types";
import classes from "../Section.module.css";
import { SectionTitle } from "../SectionTitle";

interface SimpleSectionProps {
  section: SectionConfig;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
  replacePlaceholders?: (text: string) => string;
}

function SimpleSectionComponent({
  section,
  getSectionId,
  onSectionClick,
  replacePlaceholders,
}: SimpleSectionProps): ReactElement {
  const sectionId = getSectionId(section.TITLE);
  const titleId = `${sectionId}-title`;

  const processContent = useCallback(
    (content: string): string => {
      return replacePlaceholders ? replacePlaceholders(content) : content;
    },
    [replacePlaceholders]
  );

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
        {processContent(section.CONTENT || "")}
      </Text>
    </section>
  );
}

export const SimpleSection = memo(SimpleSectionComponent);
