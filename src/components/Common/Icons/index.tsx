import { memo } from "react";
// Import only the icons you actually use based on the config and components
import {
  IconApi,
  IconArrowBack,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  // Skills icons
  IconBrain,
  IconBrandAws,
  IconBrandAzure,
  IconBrandDocker,
  IconBrandFacebook,
  IconBrandGit,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandJavascript,
  IconBrandLinkedin,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandOpenai,
  IconBrandPython,
  IconBrandReact,
  IconBrandTwitter,
  IconBrandTypescript,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconChevronDown,
  IconCloud,
  IconCode,
  IconCookie,
  IconCopy,
  IconDatabase,
  IconExternalLink,
  IconFolder,
  IconHome,
  IconMail,
  IconProps,
  IconServer,
  IconShare,
  IconTestPipe,
  IconTools,
  IconUser,
} from "@tabler/icons-react";

// Create a mapping of icon names to components
// Using as const for better type inference
const iconMap = {
  IconApi,
  IconArrowBack,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  // Skills icons
  IconBrain,
  IconBrandAws,
  IconBrandAzure,
  IconBrandDocker,
  IconBrandFacebook,
  IconBrandGit,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandJavascript,
  IconBrandLinkedin,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandOpenai,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconChevronDown,
  IconCloud,
  IconCode,
  IconCopy,
  IconCookie,
  IconDatabase,
  IconExternalLink,
  IconFolder,
  IconHome,
  IconMail,
  IconServer,
  IconShare,
  IconTestPipe,
  IconTools,
  IconUser,
} as const;

type CustomIconProps = {
  name: keyof typeof iconMap;
} & IconProps;

function IconComponent({ name, ...rest }: CustomIconProps) {
  const Icon = iconMap[name];
  if (!Icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Icon ${name} not found`);
    }
    return null;
  }
  return <Icon {...rest} />;
}

// Memoize the Icon component to prevent unnecessary re-renders
const Icon = memo(IconComponent);

export default Icon;
