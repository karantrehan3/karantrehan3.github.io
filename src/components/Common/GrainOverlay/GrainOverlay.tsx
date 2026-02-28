import { ReactElement } from "react";

import classes from "./GrainOverlay.module.css";

export function GrainOverlay(): ReactElement {
  return (
    <div className={classes.grain} aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
