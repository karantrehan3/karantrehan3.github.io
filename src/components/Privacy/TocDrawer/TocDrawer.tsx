import { memo, ReactElement } from "react";
import { Drawer } from "@mantine/core";

import { TableOfContents } from "../TableOfContents";
import { TableOfContentsItem } from "../types";
import classes from "./TocDrawer.module.css";

interface TocDrawerProps {
  opened: boolean;
  onClose: () => void;
  items: TableOfContentsItem[];
  onSectionClick: (id: string) => void;
}

function TocDrawerComponent({
  opened,
  onClose,
  items,
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
      <TableOfContents items={items} onSectionClick={onSectionClick} />
    </Drawer>
  );
}

export const TocDrawer = memo(TocDrawerComponent);
