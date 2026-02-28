import { ReactElement } from "react";

import classes from "./ZigZag.module.css";

const ZigZag = (): ReactElement => {
  return (
    <div className={classes.divider} role="separator" aria-hidden="true" />
  );
};

export default ZigZag;
