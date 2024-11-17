import { ReactNode, FC } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
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
      {header && <Header />}
      {children}
      {footer && <Footer />}
    </div>
  );
};
