import { FC, ReactNode, useRef } from "react";

import { CommonHeader } from "@/components/Common/CommonHeader";
import { Footer } from "@/components/Common/Footer";
import { GrainOverlay } from "@/components/Common/GrainOverlay";
import { SmoothScrollProvider } from "@/hooks/SmoothScrollContext";
import { useCursorSpotlight } from "@/hooks/useCursorSpotlight";

import classes from "./PageLayout.module.css";

interface PageLayoutProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  header = true,
  footer = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useCursorSpotlight(containerRef);

  return (
    <div className={classes.pageContainer} ref={containerRef}>
      <GrainOverlay />
      {header ? (
        <SmoothScrollProvider>
          <CommonHeader />
          <div className={classes.content}>{children}</div>
        </SmoothScrollProvider>
      ) : (
        children
      )}
      {footer && <Footer />}
    </div>
  );
};
