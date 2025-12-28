import { memo, ReactElement } from "react";
import { List, Text } from "@mantine/core";

import { SectionConfig } from "../../types";
import classes from "../Section.module.css";
import { SectionTitle } from "../SectionTitle";

interface SimpleListSectionProps {
  section: SectionConfig;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
}

function SimpleListSectionComponent({
  section,
  getSectionId,
  onSectionClick,
}: SimpleListSectionProps): ReactElement {
  const sectionId = getSectionId(section.TITLE);
  const titleId = `${sectionId}-title`;

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
      <Text mb="sm" className={classes.section__text}>
        {section.INTRO}
      </Text>
      <List
        spacing="xs"
        className={classes.section__list}
        aria-label={`${section.TITLE} items`}
      >
        {(section.ITEMS as string[])?.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
    </section>
  );
}

export const SimpleListSection = memo(SimpleListSectionComponent);
