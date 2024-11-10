import { forwardRef } from "react";
import cx from "clsx";
import { Box, MantineLoaderComponent } from "@mantine/core";
import classes from "./BouncyLoader.module.css";

export const BouncyLoader: MantineLoaderComponent = forwardRef(
  ({ className, ...others }, ref) => (
    <Box
      component="section"
      className={cx(classes.dot, className)}
      {...others}
      ref={ref}
    />
  )
);
