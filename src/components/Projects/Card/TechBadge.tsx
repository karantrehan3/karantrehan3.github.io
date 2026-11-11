import { ComponentType, ReactElement } from "react";
import {
  IconBrandAws,
  IconBrandSlack,
  IconEye,
  IconProps,
  IconServer,
  IconStack2,
} from "@tabler/icons-react";
import {
  siDocker,
  siElectron,
  siExpress,
  siFastapi,
  siGmail,
  siKonva,
  siMediapipe,
  siMongodb,
  SimpleIcon,
  siNodedotjs,
  siOpencv,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";

import classes from "./Card.module.css";

/** Brand colours too dark to see on a dark card fall back to the text colour. */
const MIN_LUMINANCE = 0.08;

interface TablerTech {
  Icon: ComponentType<IconProps>;
  color?: string;
}

type TechIcon = SimpleIcon | TablerTech;

/**
 * Keys match the `techStack` names in config/default.json. Simple Icons
 * dropped Slack and AWS, so those use Tabler's brand icons; techs with no
 * logo (LocalStack, Bull Queue, Computer Vision) get a neutral glyph.
 */
const TECH_ICONS: Record<string, TechIcon> = {
  React: siReact,
  TypeScript: siTypescript,
  Python: siPython,
  Docker: siDocker,
  FastAPI: siFastapi,
  Electron: siElectron,
  Konva: siKonva,
  "Express.js": siExpress,
  "Node.js": siNodedotjs,
  MongoDB: siMongodb,
  OpenCV: siOpencv,
  MediaPipe: siMediapipe,
  "Gmail SMTP": siGmail,
  "Slack API": { Icon: IconBrandSlack, color: "#E01E5A" },
  "AWS S3": { Icon: IconBrandAws, color: "#FF9900" },
  "AWS SQS": { Icon: IconBrandAws, color: "#FF9900" },
  LocalStack: { Icon: IconServer },
  "Bull Queue": { Icon: IconStack2 },
  "Computer Vision": { Icon: IconEye },
};

function relativeLuminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isSimpleIcon(icon: TechIcon): icon is SimpleIcon {
  return "path" in icon;
}

function renderIcon(icon: TechIcon): ReactElement {
  if (!isSimpleIcon(icon)) {
    const { Icon, color } = icon;
    return (
      <Icon
        className={classes.techIcon}
        stroke={1.75}
        color={color ?? "currentColor"}
        aria-hidden
      />
    );
  }
  const fill =
    relativeLuminance(icon.hex) < MIN_LUMINANCE
      ? "currentColor"
      : `#${icon.hex}`;
  return (
    <svg
      className={classes.techIcon}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}

interface TechBadgeProps {
  name: string;
}

/** A tech-stack chip: brand-coloured logo plus the tech's name. */
export function TechBadge({ name }: TechBadgeProps): ReactElement {
  const icon = TECH_ICONS[name];
  return (
    <span className={classes.techBadge}>
      {icon ? renderIcon(icon) : null}
      {name}
    </span>
  );
}
