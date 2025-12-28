import { memo, ReactElement } from "react";
import { Title } from "@mantine/core";

import { TableOfContents } from "../TableOfContents";
import { TableOfContentsItem } from "../types";
import classes from "./TocSidebar.module.css";

interface TocSidebarProps {
  items: TableOfContentsItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

function TocSidebarComponent({
  items,
  activeSection,
  onSectionClick,
}: TocSidebarProps): ReactElement {
  return (
    <aside className={classes.sidebar} aria-label="Table of contents">
      <nav className={classes.sidebar__nav}>
        <Title order={3} size="h4" className={classes.sidebar__title}>
          Table of Contents
        </Title>
        <TableOfContents
          items={items}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        />
      </nav>
    </aside>
  );
}

export const TocSidebar = memo(TocSidebarComponent);
