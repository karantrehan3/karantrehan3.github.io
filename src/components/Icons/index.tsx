import { forwardRef, ForwardRefExoticComponent, RefAttributes } from "react";
import * as TablerIcons from "@tabler/icons-react";
import { IconProps } from "@tabler/icons-react";

type CustomIconProps = {
  name: keyof typeof TablerIcons;
  // other props
} & IconProps &
  RefAttributes<SVGElement>;

const Icon: ForwardRefExoticComponent<CustomIconProps> = forwardRef(
  (props, ref) => {
    const { name, ...rest } = props;
    const Icon = TablerIcons[name] as ForwardRefExoticComponent<
      RefAttributes<SVGElement>
    >;
    if (!Icon) {
      return null;
    }
    return <Icon ref={ref} {...rest} />;
  }
);

export default Icon;
