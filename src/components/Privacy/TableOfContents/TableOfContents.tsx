import { memo, ReactElement } from "react";
import { Anchor, List } from "@mantine/core";

import { TableOfContentsItem } from "../types";
import classes from "./TableOfContents.module.css";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

function TableOfContentsComponent({
  items,
  activeSection,
  onSectionClick,
}: TableOfContentsProps): ReactElement {
  return (
    <List spacing="xs" className={classes["table-of-contents"]}>
      {items.map((item) => (
        <List.Item key={item.id}>
          <Anchor
            href={`#${item.id}`}
            className={`${classes["table-of-contents__link"]} ${
              activeSection === item.id
                ? classes["table-of-contents__link--active"]
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onSectionClick(item.id);
            }}
          >
            {item.title}
          </Anchor>
        </List.Item>
      ))}
    </List>
  );
}

export const TableOfContents = memo(TableOfContentsComponent);
