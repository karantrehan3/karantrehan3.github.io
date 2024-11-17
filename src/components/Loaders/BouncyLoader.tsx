import { forwardRef } from "react";
import cx from "clsx";
import { Box, MantineLoaderComponent } from "@mantine/core";
import classes from "./BouncyLoader.module.css";

export const BouncyLoader: MantineLoaderComponent = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements["div"]
>(({ className, ...others }, ref) => (
  <Box
    component="section"
    className={cx(classes.dot, className)}
    {...others}
    ref={ref}
  />
));
