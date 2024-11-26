import { ForwardRefExoticComponent, forwardRef, RefAttributes } from "react";
import * as TablerIcons from "@tabler/icons-react";

type IconProps = {
  name: keyof typeof TablerIcons;
  // other props
};

const IconComponent: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGElement>
> = forwardRef((props, ref) => {
  const { name, ...rest } = props;
  const Icon = TablerIcons[name] as ForwardRefExoticComponent<
    RefAttributes<SVGElement>
  >;
  if (!Icon) {
    return null;
  }
  return <Icon ref={ref} {...rest} />;
});

export default IconComponent;
