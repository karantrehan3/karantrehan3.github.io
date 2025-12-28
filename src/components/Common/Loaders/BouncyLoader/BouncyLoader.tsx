import { forwardRef } from "react";
import { Box, MantineLoaderComponent } from "@mantine/core";
import cx from "clsx";

import classes from "./BouncyLoader.module.css";

export const BouncyLoader: MantineLoaderComponent = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements["div"]
>(({ className, ...others }, ref) => (
  <Box
    component="div"
    className={cx(classes.loader, className)}
    {...others}
    ref={ref}
  >
    <div className={classes.loader__dot} />
  </Box>
));
