import { ReactElement } from "react";
import classes from "./index.module.css";

const ZigZag = (): ReactElement => {
  return (
    <svg
      className={classes.zigzag}
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" />
    </svg>
  );
};

export default ZigZag;
