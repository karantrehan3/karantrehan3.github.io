import { FC, ReactNode, useEffect } from "react";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const parentBackgroundColor =
      window.parent.document.body.style.backgroundColor;
    document.getElementById("layout")!.style.backgroundColor =
      parentBackgroundColor;
  }, []);

  return (
    <div id="layout" className={classes.layout}>
      {children}
    </div>
  );
};

export default Layout;
