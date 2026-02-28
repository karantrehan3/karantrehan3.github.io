import { FC, ReactNode, useCallback, useRef } from "react";

import { CommonHeader } from "@/components/Common/CommonHeader";
import { Footer } from "@/components/Common/Footer";
import { GrainOverlay } from "@/components/Common/GrainOverlay";
import {
  SmoothScrollProvider,
  useSmoothScrollContext,
} from "@/hooks/SmoothScrollContext";
import { useCursorSpotlight } from "@/hooks/useCursorSpotlight";

import classes from "./PageLayout.module.css";

interface PageLayoutProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
}

function ScrollContent({ children }: { children: ReactNode }) {
  const { contentRef } = useSmoothScrollContext();

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
    },
    [contentRef]
  );

  return (
    <div className={classes.content} ref={setRef}>
      {children}
    </div>
  );
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
          <ScrollContent>{children}</ScrollContent>
        </SmoothScrollProvider>
      ) : (
        children
      )}
      {footer && <Footer />}
    </div>
  );
};
