import { FC, ReactNode } from "react";

import { Footer } from "@/components/Common/Footer";
import { Header } from "@/components/Common/Header";

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
          <Header />
          <div className={classes.content}>{children}</div>
        </>
      ) : (
        children
      )}
      {footer && <Footer />}
    </div>
  );
};
