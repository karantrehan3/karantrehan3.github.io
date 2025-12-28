import { FC } from "react";
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
  IconBrandX,
  IconChevronDown,
  IconCloud,
  IconCode,
  IconCookie,
  IconDatabase,
  IconExternalLink,
  IconFolder,
  IconHome,
  IconMail,
  IconProps,
  IconServer,
  IconTestPipe,
  IconTools,
  IconUser,
} from "@tabler/icons-react";

// Create a mapping of icon names to components
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
  IconBrandX,
  IconChevronDown,
  IconCloud,
  IconCode,
  IconCookie,
  IconDatabase,
  IconExternalLink,
  IconFolder,
  IconHome,
  IconMail,
  IconServer,
  IconTestPipe,
  IconTools,
  IconUser,
};

type CustomIconProps = {
  name: keyof typeof iconMap;
  // other props
} & IconProps;

const Icon: FC<CustomIconProps> = (props) => {
  const { name, ...rest } = props;
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }
  return <IconComponent {...rest} />;
};

export default Icon;
