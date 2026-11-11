import { ReactElement } from "react";

import classes from "./Card.module.css";
import { TECH_ICONS, TechIconData } from "./techIcons";

function TechIcon({ paths, color, stroked }: TechIconData): ReactElement {
  const paint = color ?? "currentColor";
  return (
    <svg
      className={classes.techIcon}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      {...(stroked
        ? {
            fill: "none",
            stroke: paint,
            strokeWidth: 1.75,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          }
        : { fill: paint })}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps): ReactElement {
  const icon = TECH_ICONS[name];
  return (
    <span className={classes.techBadge}>
      {icon ? <TechIcon {...icon} /> : null}
      {name}
    </span>
  );
}
