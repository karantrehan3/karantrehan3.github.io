import { FC, ReactNode } from "react";

import { CommonHeader } from "@/components/Common/CommonHeader";
import { Footer } from "@/components/Common/Footer";

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
  return (
    <div className={classes.pageContainer}>
      {header ? (
        <>
          <CommonHeader />
          <div className={classes.content}>{children}</div>
        </>
      ) : (
        children
      )}
      {footer && <Footer />}
    </div>
  );
};
