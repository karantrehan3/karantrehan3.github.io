import { ReactElement } from "react";
import { Text, Badge } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import classes from "./RoleItem.module.css";

interface RoleItemProps {
  title: string;
  period: string;
  description: string;
}

export function RoleItem({
  title,
  period,
  description,
}: RoleItemProps): ReactElement {
  return (
    <div className={classes.roleItem}>
      <div className={classes.roleHeader}>
        <Text fw={600} className={classes.roleTitle}>
          {title}
        </Text>
        <Badge size="sm" variant="light" className={classes.rolePeriod}>
          {period}
        </Badge>
      </div>
      <div className={classes.roleDescription}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
}
