import { memo, ReactElement } from "react";
import { Drawer } from "@mantine/core";

import { TableOfContents } from "../TableOfContents";
import { TableOfContentsItem } from "../types";
import classes from "./TocDrawer.module.css";

interface TocDrawerProps {
  opened: boolean;
  onClose: () => void;
  items: TableOfContentsItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

function TocDrawerComponent({
  opened,
  onClose,
  items,
  activeSection,
  onSectionClick,
}: TocDrawerProps): ReactElement {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Table of Contents"
      position="left"
      size="md"
      className={classes["toc-drawer"]}
    >
      <TableOfContents
        items={items}
        activeSection={activeSection}
        onSectionClick={onSectionClick}
      />
    </Drawer>
  );
}

export const TocDrawer = memo(TocDrawerComponent);
