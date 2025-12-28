import { memo, ReactElement } from "react";
import { Anchor, List, Text } from "@mantine/core";

import { ListItemWithLabel, SectionConfig } from "../../types";
import classes from "../Section.module.css";
import { SectionTitle } from "../SectionTitle";

interface LabeledListSectionProps {
  section: SectionConfig;
  getSectionId: (title: string) => string;
  onSectionClick: (id: string) => void;
}

function LabeledListSectionComponent({
  section,
  getSectionId,
  onSectionClick,
}: LabeledListSectionProps): ReactElement {
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
        {(section.ITEMS as ListItemWithLabel[])?.map((item, index) => (
          <List.Item key={index}>
            <Text component="span">
              <Text component="strong" fw={600} span>
                {item.LABEL}:
              </Text>{" "}
              {item.DESCRIPTION}
              {item.LINK && (
                <>
                  {" "}
                  (
                  <Anchor
                    href={item.LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.LINK_TEXT} (opens in new tab)`}
                  >
                    {item.LINK_TEXT}
                  </Anchor>
                  )
                </>
              )}
            </Text>
          </List.Item>
        ))}
      </List>
    </section>
  );
}

export const LabeledListSection = memo(LabeledListSectionComponent);
