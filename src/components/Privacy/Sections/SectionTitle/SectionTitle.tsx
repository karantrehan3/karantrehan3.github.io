import { memo, ReactElement } from "react";
import { Anchor, Box, Title } from "@mantine/core";

import classes from "./SectionTitle.module.css";

interface SectionTitleProps {
  title: string;
  sectionId: string;
  titleId: string;
  onSectionClick: (id: string) => void;
}

function SectionTitleComponent({
  title,
  sectionId,
  titleId,
  onSectionClick,
}: SectionTitleProps): ReactElement {
  return (
    <Title
      order={2}
      size="h3"
      id={titleId}
      className={classes["section-title"]}
    >
      <Box component="span" className={classes["section-title__wrapper"]}>
        {title}
        <Anchor
          href={`#${sectionId}`}
          className={classes["section-title__link"]}
          aria-label={`Link to ${title}`}
          onClick={(e) => {
            e.preventDefault();
            onSectionClick(sectionId);
          }}
        >
          🔗
        </Anchor>
      </Box>
    </Title>
  );
}

export const SectionTitle = memo(SectionTitleComponent);
